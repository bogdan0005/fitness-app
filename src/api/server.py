from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import json

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('fitness.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/fitness-clubs', methods=['GET'])
def get_fitness_clubs():
    conn = get_db_connection()
    clubs = conn.execute('SELECT * FROM fitness_clubs').fetchall()
    conn.close()
    return jsonify([dict(club) for club in clubs])

@app.route('/api/ready-programs', methods=['GET'])
def get_ready_programs():
    conn = get_db_connection()
    programs = conn.execute('SELECT * FROM ready_programs').fetchall()
    conn.close()
    return jsonify([dict(program) for program in programs])

@app.route('/api/group-programs', methods=['GET'])
def get_group_programs():
    conn = get_db_connection()
    programs = conn.execute('SELECT * FROM group_programs').fetchall()
    conn.close()
    return jsonify([dict(program) for program in programs])

@app.route('/api/pools', methods=['GET'])
def get_pools():
    conn = get_db_connection()
    pools = conn.execute('SELECT * FROM pools').fetchall()
    conn.close()
    return jsonify([dict(pool) for pool in pools])

@app.route('/api/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    
    user = conn.execute('SELECT * FROM user_profiles LIMIT 1').fetchone()
    
    if not user:
        conn.close()
        return jsonify({"error": "Пользователь не найден"}), 404
    
    user_dict = dict(user)
    
    favorite_ready_ids = json.loads(user_dict['favorite_ready_programs'])
    if favorite_ready_ids:
        placeholders = ','.join('?' for _ in favorite_ready_ids)
        favorite_ready = conn.execute(
            f'SELECT * FROM ready_programs WHERE id IN ({placeholders})',
            favorite_ready_ids
        ).fetchall()
        user_dict['favorite_ready_programs_data'] = [dict(prog) for prog in favorite_ready]
    else:
        user_dict['favorite_ready_programs_data'] = []
    
    favorite_group_ids = json.loads(user_dict['favorite_group_programs'])
    if favorite_group_ids:
        placeholders = ','.join('?' for _ in favorite_group_ids)
        favorite_group = conn.execute(
            f'SELECT * FROM group_programs WHERE id IN ({placeholders})',
            favorite_group_ids
        ).fetchall()
        user_dict['favorite_group_programs_data'] = [dict(prog) for prog in favorite_group]
    else:
        user_dict['favorite_group_programs_data'] = []
    
    custom_program_ids = json.loads(user_dict['custom_programs'])
    if custom_program_ids:
        placeholders = ','.join('?' for _ in custom_program_ids)
        custom_programs = conn.execute(
            f'SELECT * FROM custom_programs WHERE id IN ({placeholders})',
            custom_program_ids
        ).fetchall()
        user_dict['custom_programs_data'] = [dict(prog) for prog in custom_programs]
    else:
        user_dict['custom_programs_data'] = []
    
    conn.close()
    return jsonify(user_dict)

@app.route('/api/ready-programs/filter', methods=['GET'])
def filter_ready_programs():
    goal = request.args.get('goal')
    level = request.args.get('level')
    
    query = 'SELECT * FROM ready_programs WHERE 1=1'
    params = []
    
    if goal:
        query += ' AND goal = ?'
        params.append(goal)
    
    if level:
        query += ' AND level = ?'
        params.append(level)
    
    conn = get_db_connection()
    programs = conn.execute(query, params).fetchall()
    conn.close()
    
    return jsonify([dict(program) for program in programs])

if __name__ == '__main__':
    app.run(debug=True, port=5000)