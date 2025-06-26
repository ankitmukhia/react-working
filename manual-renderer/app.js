/* const element = <h1 title="foo">Hello Own React</h1>
const container = document.getElementById("root")
ReactDOM.render(element, container) */

// React Element(plain js object)
const element = {
	type: "h1",
	props: {
		title: "foo",
		children: "hello",
	}
}

const container = document.getElementById("root")

// manually converting React Element into real DOM nodes
const node = document.createElement(element.type)
node["title"] = element.props.title

// we append children(hello) inside createdElement
const text = document.createTextNode("")
text["nodeValue"] = element.props.children

// append the textNode to h1 and the h1 to container.
node.appendChild(text)
container.appendChild(node)
