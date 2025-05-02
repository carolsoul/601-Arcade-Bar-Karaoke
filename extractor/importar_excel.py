import pandas as pd
import mysql.connector

# === PARTE 1: LEITURA DO EXCEL ===
print("📄 Lendo o arquivo Excel...")
file_path = 'musicas_karaoke.xlsx'

df = pd.read_excel(file_path)

# Renomear colunas para o padrão esperado
df.rename(columns={
    'Cod': 'Codigo',
    'Inicio da letra': 'InicioDaLetra'
}, inplace=True)

print(df.head())

# Juntar todas as tabelas
df = df.where(pd.notnull(df), None)

config = {
    'host': 'localhost',
    'user': 'root',
    'password': '11Ajl2005!',
    'port': 3306,
    'connection_timeout': 10
}
# === PARTE 2: INSERÇÃO NO MYSQL ===

try:
    print("🔌 Conectando ao MySQL...")
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()

    # Criar banco e tabela
    cursor.execute("CREATE DATABASE IF NOT EXISTS karaoke")
    cursor.execute("USE karaoke")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS musicas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            interprete VARCHAR(255),
            codigo INT,
            titulo VARCHAR(255),
            inicio_da_letra TEXT,
            idioma VARCHAR(50)
        )
    """)

    # Inserir dados
    print("📥 Inserindo músicas no banco...")
    for i, row in df.iterrows():
        try:
            codigo = int(row['Codigo']) if pd.notna('Codigo') else None
        except ValueError:
            codigo = None

        cursor.execute("""
            INSERT INTO musicas (interprete, codigo, titulo, inicio_da_letra, idioma)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            row['Interprete'],
            codigo,
            row['Titulo'],
            row['InicioDaLetra'],
            row['Idioma']
        ))

        if i % 100 == 0:
            print(f"🔄 {i} músicas inseridas...")

    conn.commit()
    print("✅ Todas as músicas foram inseridas com sucesso!")

except mysql.connector.Error as err:
    print("❌ Erro ao conectar ou inserir no MySQL:", err)

finally:
    if 'cursor' in locals():
        cursor.close()
    if 'conn' in locals():
        conn.close()