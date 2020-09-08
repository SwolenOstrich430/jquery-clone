import { start } from "repl";

class JQuery {
    private element: HTMLElement;
    private CLASS_NAME_REGEX: RegExp = RegExp("^[a-zA-Z_-][a-zA-Z\d_-]*$");

    static fromIdentifier(identifier: string): JQuery | undefined {
        let element: HTMLElement | null = document.querySelector(identifier);
        if(element === null) return undefined;
        return new JQuery(element);
    } 

    constructor(htmlElement: HTMLElement) {
        this.element = htmlElement;
    }

    getElement(): HTMLElement {
        return this.element;
    }

    getCssProperty(propertyName: any): string {
        const elemStyle: CSSStyleDeclaration = this.element.style; 
        return elemStyle.getPropertyValue(propertyName);
    }

    setCssProperty(propertyName: any, value: string): void {
        let currInlineStyle: CSSStyleDeclaration = this.element.style;
        currInlineStyle.setProperty(propertyName, value);
    }

    setCssProperties(propertiesAsObject: {[key: string]: string}): void {
        for(const key in propertiesAsObject) {
            this.setCssProperty(key, propertiesAsObject[key]);
        }
    }

    setText(newText: string): void {
        this.element.textContent = newText;
    }

    getText(): string {
        const textContent = this.element.textContent;
        if(textContent !== null) return textContent;
        return "";
    }

    getAttr(attribute: string): string {
        let attributeValue: string | null = this.element.getAttribute(attribute);
        if(attributeValue === null) return "";
        return attributeValue;
    }

    setAttr(attribute: string, value: string): void {
        this.element.setAttribute(attribute, value);
    }

    removeAttr(attribute: string): void {
        this.element.removeAttribute(attribute);
    }

    getHtml(): string {
        return this.element.innerHTML;
    }
   
    click(callback: Function): void {
        this.element.addEventListener("click", (event: MouseEvent) => {
            callback();
        })
    }

    blur(callback: Function): void {
        this.element.addEventListener("blur", () => {
            callback();
        });
    }

    focus(callback: Function): void {
        this.element.addEventListener("focus", () => {
            callback();
        })
    }

    addChild(newChildElement: HTMLElement): void {
        this.element.appendChild(newChildElement);
    }

    children(): HTMLCollection {
        return this.element.children;
    }

    addClass(newClass: string): void {
        if(!this.CLASS_NAME_REGEX.test(newClass)) {
            throw new Error(`Invalid characters in class name: '${newClass}'`);
        }

        newClass = this.element.className.length > 0 ? ` ${newClass}` : newClass;
        let newClassName = this.element.className + newClass;
        this.element.className = newClassName;
    }

    getClass(): string {
        return this.element.className;
    }

    removeClass(classToRemove: string): void {
        let startIndex = this.element.className.indexOf(classToRemove);
        let endIndex = startIndex + classToRemove.length;
        let oldClassName = this.element.className;
        
        if(startIndex < 0) return;

        if(endIndex !== oldClassName.length) {
            endIndex++;
        } else {
            startIndex--;
        }
        
        let newClassNames = oldClassName.slice(0, startIndex) + oldClassName.slice(endIndex, oldClassName.length);
        this.element.className = newClassNames;
    }
}

module.exports = JQuery;