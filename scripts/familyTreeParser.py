import json
'''
	Strat: 
		Parse lines, create nodes in tree
		Traverse tree, output as JSON
'''
class Node:
	def __init__(self, name):
		self.name = name
		self.children = []

	def getChild(self, name):
		for child in self.children:
			if name == child.name:
				return child
		return None

	def insertPath(self, famList, leaf):
		if len(famList) == 0:
			self.children.append(Node(leaf))
			return
		child = self.getChild(famList[0])
		if child is None:
			child = Node(famList[0])
			self.children.append(child)
		child.insertPath(famList[1:], leaf)


root = Node("root")

languages = open('hh17.txt', 'r').read().split('\n\n\n\n')

for language in languages:
	lines = language.split('\n');
	name = lines[1][6:]

	if lines[3][:15] != "Classification:":			# Ignore if doesn't have classification
		continue

	famList = lines[3][16:].split(',')
	
	root.insertPath(famList, name)

data = {}
# Print Tree
def treeToJson(node):
	childrenList = [treeToJson(c) for c in node.children]

	if len(childrenList) == 0:
		obj = {
			"name": node.name,
			"size": 1
		}
	else :
		obj = {
			"name": node.name,
			"children": childrenList
		}
	return obj
	# print node.name
	# if len(node.children) > 0:
	# 	treeToJson(node.children[0])
data = treeToJson(root)
print json.dumps(data)

