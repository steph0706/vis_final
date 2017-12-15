import json
'''
Strat:
	- 
	-
	-
'''

class Node:
	def __init__(self, name):
		self.name = name

class Link:
	def __init__(self, source, target, value):
		self.source = source;
		self.target = target;
		self.value = value;

nodes = []
links = []

root = Node("root")

languages = open('hh17.txt', 'r').read().split('\n\n\n\n')

for language in languages:
	lines = language.split('\n');
	name = lines[1][6:]

	if lines[3][:15] != "Classification:":			# Ignore if doesn't have classification
		continue

	famList = lines[3][16:].split(',')
	
	for i in xrange(0, len(famList)):
		nodes.append(Node(famList[i]))

		if i == len(famList) - 1:
			links.append(Link(famList[i], famList[i+1], 1))

	nodes.append(Node(name))
	links.append(Link())