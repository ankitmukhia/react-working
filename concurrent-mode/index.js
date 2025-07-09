/* 
 * Problem with current render, Once render() starts, it keeps going until the entire tree is processed.
 * For large tree, it will block the browser.
 * During that blocking time, it can't handler user input, animations etc.
 */

/*
 * Fix: break rendering into units of work.
 * Render one unit at a time.
 * So now after we finish each unit we'll let the browser interrupt in between the rendering, to anything that needs to be done.
 *
 * [unit}<->check in between<->[unit]<->check in between<->[unit]
 *
 * Why do we check in between because browser run on a single thread.
 *
 * Idle means when all high priority job is done i.e clicks, typing, scrolling, animations etc.
 * requestIdleCallback: gives deadline parameter. checks how many milliseconds I(the browser) can give you before it gets busy again with units. 
 */

function createElement(type, props, ...children) {
	return {
		type,
		props: {
			...props,
			children: children.map(child =>
				typeof child === "object"
					? child
					: createTextElement(child)
			),
		},
	}
}

function createTextElement(text) {
	return {
		type: "TEXT_ELEMENT",
		props: {
			nodeValue: text,
			children: [],
		},
	}
}

function render(element, container) {
	const dom =
		element.type == "TEXT_ELEMENT"
			? document.createTextNode("")
			: document.createElement(element.type)

	const isProperty = key => key !== "children"
	Object.keys(element.props)
		.filter(isProperty)
		.forEach(name => {
			dom[name] = element.props[name]
		})

	element.props.children.forEach(child =>
		render(child, dom)
	)

	container.appendChild(dom)
}

const Didact = {
	createElement,
	render,
}

/** @jsx Didact.createElement */
const element = (
	<div style="background: salmon">
		<h1>Hello World</h1>
		<h2 style="text-align:right">from Didact</h2>
	</div>
);

const container = document.getElementById("root")
Didact.render(element, container)
