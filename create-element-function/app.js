// will mimics the React.createElement -> which converts our jsx to object of elements
// ... on function is rest arg, and on props is spread operator.
// in dom everything is represented as node. -> element = node, text = node, comment = node 

function createElement(type, props, ...children) {
	return {
		type,
		props: {
			...props,
			children: children.map(child => typeof child === "object" ? child : createTextElement(child))
		}
	}
}

function createTextElement(text) {
	return {
		type: "TEXT_ELEMENT",
		props: {
			nodeValue: text,
			children: []
		}
	}
}

const Didact = {
	createElement
}

const element = Didact.createElement(
	Didact.createElement("a", null, "bar"),
	Didact.createElement("b")
)

const container = document.getElementById("root")
