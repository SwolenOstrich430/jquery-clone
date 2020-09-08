import { executionAsyncId } from "async_hooks";

let $ = require("../main/$");

const getNewElem = (elemName: string): HTMLElement => document.createElement(elemName);

const simulateEvent = (element: HTMLElement, eventName: string) => {
    var event = new MouseEvent(eventName, {
		bubbles: true,
		cancelable: true,
		view: window
    });
    
    element.dispatchEvent(event);
}

test("constructor: jquery constuctor takes HTML element", function() {
    const jqueryElem = new $(getNewElem("div"));
    expect(jqueryElem instanceof $).toBe(true);    
});

test("fromIdentifier: jquery factory method takes element id in constructor", function() {
    let newHtmlElem: HTMLElement = getNewElem("div");
    newHtmlElem.setAttribute("id", "uniqueId");
    document.body.appendChild(newHtmlElem);
    const jqueryElem = new $.fromIdentifier("#uniqueId");

    expect(jqueryElem.getElement()).toBe(newHtmlElem);
});

test("fromIdentifier: jquery factory method takes class name and returns jquery elem", function() {
    let newHtmlElem: HTMLElement = getNewElem("div");
    newHtmlElem.setAttribute("class", "uniqueClass");
    document.body.appendChild(newHtmlElem);
    const jqueryElem = new $.fromIdentifier(".uniqueClass");
});

test("getText: if textContent is not null return text content", function() {
    let newElem: HTMLElement = getNewElem("div");
    newElem.textContent = "some text";
    const jqueryElem = new $(newElem);
    expect(jqueryElem.getText() === "some text").toBe(true);
});

test("click: onClick runs callback function supplied as argument", function() {
    const jqueryElem = new $(getNewElem("div"));
    const callbackToTest = jest.fn(() => Promise.resolve());
    jqueryElem.click(callbackToTest);
    simulateEvent(jqueryElem.getElement(), "click");
    expect(callbackToTest).toHaveBeenCalled();
});


test("blur: onBlue runs callback function supplied as arg", function() {
    const jqueryElem = new $(getNewElem("div"));
    const callbackToTest = jest.fn();
    jqueryElem.blur(callbackToTest);
    simulateEvent(jqueryElem.getElement(), "blur");
    expect(callbackToTest).toHaveBeenCalled();
});

test("focus: onFocus run callback function supplied as arg", function() {
    const jqueryElem = new $(getNewElem("div"));
    const callbackToTest = jest.fn();
    jqueryElem.focus(callbackToTest);
    simulateEvent(jqueryElem.getElement(), "focus");
    expect(callbackToTest).toHaveBeenCalled();
})

test("getText: if textContent is null return empty string", function() {
    let newElem: HTMLElement = getNewElem("div");
    const jqueryElem = new $(newElem);
    expect(jqueryElem.getText() === "").toBe(true);
});

test("setText: set text of an element to some non-null string", function() {
    const jqueryElem = new $(getNewElem("div"));
    jqueryElem.setText("some text to input");
    expect(jqueryElem.getText() === "some text to input").toBe(true);
});

test("setCssProperty: set property passed as first arg with value as second arg", function() {
    const jqueryElem = new $(getNewElem("div"));
    jqueryElem.setCssProperty("background-color", "red");
    expect(jqueryElem.getCssProperty("background-color") === "red").toBe(true);
});

test("setCssProperty: set css property after inline styles already exist", function() {
    const jqueryElem = new $(getNewElem("div"));
    jqueryElem.setCssProperty("background-color", "red");
    jqueryElem.setCssProperty("display", "flex");

    expect(jqueryElem.getCssProperty("background-color")).toBe("red");
}); 

test("setCssProperties: set multiple css properties in object passed in as first argument", function() {
    const jqueryElem = new $(getNewElem("div"));
    const newCssProperties: { [key: string]: string; } = {
        "background-color": "red", 
        "border": "1px solid black", 
        "padding": "10px"
    };
    jqueryElem.setCssProperties(newCssProperties);
    expect(jqueryElem.getCssProperty("background-color")).toBe("red");
    expect(jqueryElem.getCssProperty("border")).toBe("1px solid black");
    expect(jqueryElem.getCssProperty("padding")).toBe("10px");
});

test("getCssProperty: return string value of css property passed into function", function() {
    const newHtmlElem = getNewElem("div")
    const jqueryElem = new $(newHtmlElem);
    jqueryElem.setCssProperty("background-color", "red");
    const elemColor: string = jqueryElem.getCssProperty("background-color");
    expect(elemColor === "red").toBe(true);
});

test("getCssProperty: return empty string if css property has not been set", function() {
    const jqueryElem = new $(getNewElem("div"));
    expect(jqueryElem.getCssProperty("background-color")).toBe("");
});

test("getAttr: returns element attribute specified by first param", function() {
    let htmlElem: HTMLElement = getNewElem("a");
    htmlElem.setAttribute("href", "www.google.com");
    const jqueryElem = new $(htmlElem);
    expect(jqueryElem.getAttr("href")).toBe("www.google.com");
});

test("getAttr: returns empty string if element attribute specified does not exist", function() {
    const jqueryElem = new $(getNewElem("div"));
    expect(jqueryElem.getAttr("asdfasdfadsfdsaf")).toBe("");
});

test("setAttr: sets value of attribute specified as first arg", function() {
    const jquery = new $(getNewElem("div"));
    jquery.setAttr("href", "www.google.com");
    expect(jquery.getAttr("href")).toBe("www.google.com");
});

test("getHtml: get html of elements within main element", function() {
    const jqueryElem = new $(getNewElem("div"));
    let nodeToAdd = getNewElem("div");
    nodeToAdd.className = "newClass";
    jqueryElem.addChild(nodeToAdd);
    expect(jqueryElem.getHtml()).toBe(`<div class="newClass"></div>`);
});

test("removeAttr: remove attribute specified as first arg", function() {
    const jqueryElem = new $(getNewElem("div"));
    jqueryElem.setAttr("align", "center");
    expect(jqueryElem.getAttr("align")).toBe("center");
    jqueryElem.removeAttr("align");
    expect(jqueryElem.getAttr("align").length).toBe(0);
})

test("addChild: add a child element to the element's tree", function() {
    const jquery = new $(getNewElem("div"));
    const newElem = getNewElem("div");
    jquery.addChild(newElem);
    expect(jquery.children().length).toBe(1);
})

test("children: get all children of given element when no children present returns 0", function() {
    const jqueryElem = new $(getNewElem("div"));
    expect(jqueryElem.children().length).toBe(0);
    const newElem = getNewElem("div");
    jqueryElem.addChild(newElem);
    expect(jqueryElem.children().length).toBe(1);
    expect(jqueryElem.children()[0]).toBe(newElem);
});

test("addClass: add class given as argument to className on element with no current classes set", function() {
    const jqueryElem = new $(getNewElem("div"));
    jqueryElem.addClass("newClass");
    expect(jqueryElem.getClass()).toBe("newClass");
});

test("addClass: add class given as argument to className on element with current classes set", function() {
    const jqueryElem = new $(getNewElem("div"));
    jqueryElem.addClass("newClass");
    jqueryElem.addClass("otherNewClass");
    expect(jqueryElem.getClass()).toBe("newClass otherNewClass");
});

test("addClass: throw error when class name starts with number", function() {
    const jqueryElem = new $(getNewElem("div"));
    expect(() => jqueryElem.addClass("234sfhafaskfahksdf")).toThrowError();
});

test("addClass: throw error when space exists in className", function() {
    const jqueryElem = new $(getNewElem("div"));
    expect(() => jqueryElem.addClass("adfafd adsfads")).toThrowError();
});

test("removeClass: remove class specified in arg from class name", function() {
    const jqueryElem = new $(getNewElem("div"));
    jqueryElem.addClass("newClass");
    jqueryElem.addClass("otherClass");
    jqueryElem.addClass("thirdClass");
    expect(jqueryElem.getClass()).toEqual("newClass otherClass thirdClass");
    jqueryElem.removeClass("thirdClass");
    expect(jqueryElem.getClass()).toEqual("newClass otherClass");
});