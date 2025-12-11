from flask import Flask, jsonify, render_template, redirect, session, request
import os
import openai
import mysql.connector

app = Flask(__name__)
app.secret_key = os.urandom(24)

openai.api_key = "AIzaSyDkZv8d6NKQcoqHF3j4QHMnPH76kLb1X24"

def conectar():
    return mysql.connector.connect(
        host="127.0.0.1",
        user="root",
        password="feroz3",
        database="ava"
    )

# Login e logout do sistema
@app.route("/")
def home():
    if('nome' in session):
        nome_completo = session.get('nome_completo')
        return render_template("index.html", nome_completo=nome_completo)
    else:
        return redirect('/login')

@app.route("/login")
def login():
  if('nome' in session):
    return redirect('/')
  else:
    return render_template("login.html")

def verificar_usuario(usuario, senha):
  conexao = conectar()
  try:
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario WHERE usuario = %s AND senha = %s", (usuario, senha))
    usuario = cursor.fetchone()
  finally:
    cursor.close()
    conexao.close()
  return usuario

@app.route("/login", methods=["POST"])
def verificarLogin():
    usuario = request.form.get("username")
    senha = request.form.get("password")

    user = verificar_usuario(usuario, senha)

    if user:
        session['nome'] = user['usuario']
        session['nome_completo'] = user['nome_completo'] 
        return redirect('/')
    else:
        return render_template("login.html", erro="Usuário ou senha inválidos")

@app.route('/logout')
def logout():
  if('nome' in session):
    session.pop('nome')
  return redirect('/login')

@app.route("/semanas")
def semanas():
    db = conectar()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM semanas")
    semanas = cursor.fetchall()

    cursor.close()
    db.close()

    return render_template("semanas.html", semanas=semanas)

@app.route("/semana/<int:numero>")
def semana_detalhes(numero):
    db = conectar()
    cursor = db.cursor(dictionary=True)

    # BUSCAR A SEMANA
    cursor.execute(
        "SELECT * FROM semanas WHERE numero_semana = %s",
        (numero,)
    )
    semana = cursor.fetchone()

    if not semana:
        return "Semana não encontrada", 404

    # BUSCAR CONTEÚDOS DA SEMANA
    cursor.execute(
        "SELECT * FROM conteudos WHERE semana_id = %s",
        (semana["id"],)
    )
    conteudos = cursor.fetchall()

    return render_template("semana_detalhe.html",
                          semana=semana,
                          conteudos=conteudos)

@app.route("/chatbot", methods=["POST"])
def chatbot():
    if 'nome' not in session:
        return jsonify({"erro": "Usuário não logado"}), 401

    pergunta = request.json.get("pergunta")
    if not pergunta:
        return jsonify({"erro": "Pergunta vazia"}), 400

    try:
        resposta = openai.ChatCompletion.create(
            model="gemini-1.3",
            messages=[
                {"role": "system", "content": "Você é um assistente de estudo EAD para materiais de Pernambuco."},
                {"role": "user", "content": pergunta}
            ],
            max_tokens=300
        )
        texto_resposta = resposta.choices[0].message.content
        return jsonify({"resposta": texto_resposta})
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)