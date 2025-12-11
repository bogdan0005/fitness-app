import sqlite3
import json

conn = sqlite3.connect('fitness.db')
cursor = conn.cursor()

cursor.execute('DROP TABLE IF EXISTS fitness_clubs')
cursor.execute('DROP TABLE IF EXISTS ready_programs')
cursor.execute('DROP TABLE IF EXISTS group_programs')
cursor.execute('DROP TABLE IF EXISTS pools')
cursor.execute('DROP TABLE IF EXISTS user_profiles')
cursor.execute('DROP TABLE IF EXISTS custom_programs')

cursor.execute('''
CREATE TABLE fitness_clubs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    work_hours TEXT NOT NULL,
    phone TEXT NOT NULL
)
''')

cursor.execute('''
CREATE TABLE ready_programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    goal TEXT NOT NULL,
    level TEXT NOT NULL
)
''')

cursor.execute('''
CREATE TABLE group_programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    goal TEXT NOT NULL,
    max_participants INTEGER NOT NULL
)
''')

cursor.execute('''
CREATE TABLE pools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    work_hours TEXT NOT NULL
)
''')

cursor.execute('''
CREATE TABLE custom_programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    goal TEXT NOT NULL,
    level TEXT NOT NULL
)
''')

cursor.execute('''
CREATE TABLE user_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    registration_date TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    weight_kg REAL,
    level TEXT,
    goal TEXT,
    favorite_ready_programs TEXT DEFAULT '[]',
    favorite_group_programs TEXT DEFAULT '[]',
    custom_programs TEXT DEFAULT '[]'
)
''')

clubs_data = [
    ("Фитнес Плаза", "ул. Спортивная, 15", "06:00-23:00", "+7 (495) 123-45-67"),
    ("СпортХаб", "пр. Здоровья, 42", "07:00-22:00", "+7 (495) 234-56-78"),
    ("Iron Gym", "ул. Силовая, 8", "05:00-00:00", "+7 (495) 345-67-89"),
    ("Flex Time", "бул. Гибкости, 33", "08:00-21:00", "+7 (495) 456-78-90"),
    ("Body Factory", "ул. Промышленная, 12", "06:30-23:30", "+7 (495) 567-89-01"),
    ("Fit Life", "пр. Долголетия, 25", "07:00-22:00", "+7 (495) 678-90-12"),
    ("Power Zone", "ул. Энергетиков, 17", "05:30-23:00", "+7 (495) 789-01-23"),
    ("Golden Fitness", "бул. Золотой, 9", "09:00-20:00", "+7 (495) 890-12-34"),
    ("City Sport", "ул. Центральная, 5", "06:00-22:00", "+7 (495) 901-23-45"),
    ("Active Club", "пр. Активный, 21", "07:00-21:00", "+7 (495) 012-34-56"),
    ("Максимум", "ул. Победы, 18", "06:00-00:00", "+7 (495) 111-22-33"),
    ("Атлетико", "пр. Чемпионов, 7", "05:00-23:00", "+7 (495) 222-33-44"),
    ("Фитнес Лэнд", "ул. Развития, 29", "07:00-22:30", "+7 (495) 333-44-55"),
    ("Энерджи", "бул. Солнечный, 14", "06:00-22:00", "+7 (495) 444-55-66"),
    ("Тонус", "ул. Бодрости, 22", "08:00-21:00", "+7 (495) 555-66-77"),
    ("Профит", "пр. Деловой, 11", "06:30-23:00", "+7 (495) 666-77-88"),
    ("Форсаж", "ул. Скоростная, 3", "05:00-00:00", "+7 (495) 777-88-99"),
    ("Вита", "бул. Жизни, 16", "07:00-22:00", "+7 (495) 888-99-00"),
    ("Рельеф", "ул. Мускульная, 24", "06:00-23:00", "+7 (495) 999-00-11"),
    ("Экстрим", "пр. Экстремальный, 9", "05:30-23:30", "+7 (495) 000-11-22")
]

cursor.executemany('INSERT INTO fitness_clubs (name, address, work_hours, phone) VALUES (?, ?, ?, ?)', clubs_data)

ready_programs_data = [
    ("Стройное тело", "Для похудения", "Новичок"),
    ("Силовой старт", "Для набора массы", "Новичок"),
    ("Кардио-удар", "Кардио", "Новичок"),
    ("Рельефное тело", "Для похудения", "Продвинутый"),
    ("Массивный рост", "Для набора массы", "Продвинутый"),
    ("Выносливость+", "Кардио", "Продвинутый"),
    ("Экстремальное похудение", "Для похудения", "Профессионал"),
    ("Про-масса", "Для набора массы", "Профессионал"),
    ("Марафонская подготовка", "Кардио", "Профессионал"),
    ("Фитнес-модель", "Для похудения", "Продвинутый"),
    ("Силовая выносливость", "Кардио", "Продвинутый"),
    ("Баланс и гармония", "Поддержание формы", "Новичок"),
    ("Король горы", "Для набора массы", "Профессионал"),
    ("Легкость движений", "Поддержание формы", "Продвинутый"),
    ("Трансформация за 30 дней", "Для похудения", "Новичок")
]

cursor.executemany('INSERT INTO ready_programs (name, goal, level) VALUES (?, ?, ?)', ready_programs_data)

group_programs_data = [
    ("Йога для всех", "Для похудения", 15),
    ("Силовая зумба", "Кардио", 20),
    ("Функциональный тренинг", "Для набора массы", 12),
    ("Кроссфит WOD", "Кардио", 10),
    ("Пилатес", "Для похудения", 18),
    ("Бокс-фитнес", "Кардио", 8),
    ("TRX тренировка", "Для набора массы", 10),
    ("Стретчинг", "Для похудения", 25),
    ("HIIT группа", "Кардио", 6),
    ("Танцевальный фитнес", "Кардио", 22),
    ("Аквааэробика", "Для похудения", 20),
    ("Силовой тренинг", "Для набора массы", 15),
    ("Циклинг", "Кардио", 25),
    ("Калланетика", "Для похудения", 30),
    ("Боевой фитнес", "Кардио", 12)
]

cursor.executemany('INSERT INTO group_programs (name, goal, max_participants) VALUES (?, ?, ?)', group_programs_data)

pools_data = [
    ("Акватория", "ул. Водная, 7", "07:00-22:00"),
    ("Морской бриз", "пр. Пляжный, 12", "06:00-23:00"),
    ("Волна", "ул. Приморская, 3", "08:00-21:00"),
    ("Океан", "бул. Океанский, 15", "07:30-20:30"),
    ("Капелька", "ул. Детская, 9", "09:00-19:00"),
    ("Аква-зон", "пр. Спортивный, 18", "06:30-22:30"),
    ("Водный мир", "ул. Развлекательная, 5", "10:00-23:00"),
    ("Плавучий", "бул. Речной, 11", "07:00-21:00"),
    ("Аква-фитнес", "ул. Здоровая, 14", "08:00-20:00"),
    ("Сплав", "пр. Быстрый, 6", "06:00-22:00"),
    ("Аква-центр", "ул. Бассейная, 13", "07:00-21:30"),
    ("Водная арена", "пр. Олимпийский, 4", "06:00-23:00"),
    ("Аквапарк", "ул. Развлечений, 8", "10:00-22:00"),
    ("Плавательный комплекс", "бул. Спортивный, 10", "07:00-22:00"),
    ("Дельфин", "ул. Морская, 2", "08:00-20:00")
]

cursor.executemany('INSERT INTO pools (name, address, work_hours) VALUES (?, ?, ?)', pools_data)

custom_programs_data = [
    ("Моя утренняя тренировка", "Для похудения", "Новичок"),
    ("Силовая программа дома", "Для набора массы", "Средний"),
    ("Кардио для выносливости", "Кардио", "Продвинутый")
]

cursor.executemany('INSERT INTO custom_programs (name, goal, level) VALUES (?, ?, ?)', custom_programs_data)

user_data = [(
    "Александр Иванов",
    "2024-01-15",
    28,
    "Мужской",
    78.5,
    "Средний",
    "Набор массы",
    json.dumps([1, 4, 7, 10, 13]),
    json.dumps([2, 5, 8, 11, 14]),
    json.dumps([1, 2, 3])
)]

cursor.executemany('''
INSERT INTO user_profiles 
(full_name, registration_date, age, gender, weight_kg, level, goal, favorite_ready_programs, favorite_group_programs, custom_programs) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', user_data)

conn.commit()
conn.close()