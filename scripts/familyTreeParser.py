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

# Print Tree
def treeToJson(node):
	# childrenList = [treeToJson(c) for c in node.children]
	childrenList = []
	size = 0

	if len(node.children) == 0:
		return ({
			"title": node.name,
			"size": 1,
			"opacity": 0.5,
			"color":0
		}, 1)

	for c in node.children:
		(childNode, childSize) = treeToJson(c)
		size += childSize
		childrenList.append(childNode)

	obj = {
		"title": node.name,
		"children": childrenList,
		"_size": size,
		"opacity": 0.5,
		"color":0
	}
	return (obj, size)

data = treeToJson(root)

otherLangFam = {
	"title": "Other",
	"children": [],
	"_size": 0,
	"opacity": 0.5,
	"color": 0
}

for c in data[0]['children']:
	if c['_size'] < 20:
		otherLangFam['children'].append(c)
		otherLangFam['_size'] += c['_size']
		data[0]['children'].remove(c)

data[0]['children'].append(otherLangFam)

print json.dumps(data)

