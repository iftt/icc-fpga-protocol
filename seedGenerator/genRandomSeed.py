from random import SystemRandom

alpha9 = u'9ABCDEFGHIJKLMNOPQRSTUVWXYZ'
password_length = 81

generator = SystemRandom()
print(u''.join(generator.choice(alpha9) for _ in range(password_length)))
