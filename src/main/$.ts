import { start } from "repl";

class JQuery {
    private elements: Array<HTMLElement>;
    private CLASS_NAME_REGEX: RegExp = RegExp("^[a-zA-Z_-][a-zA-Z\d_-]*$");

    static fromAttribute(attribute: string, attributeValue: string): JQuery {
        let elementArray: Array<HTMLElement> = new Array();
        this.populateArrayByAttribute(attribute, attributeValue, document.body.children, 0, elementArray);

        return new JQuery(elementArray);
    } 

    static fromElement(htmlElem: HTMLElement): JQuery {
        let elementArray: Array<HTMLElement> = new Array(htmlElem);
        return new JQuery(elementArray);
    }

    private static populateArrayByAttribute(attribute: string, attributeValue: string, htmlElems: any,
        currIndex: number, elemArray: Array<HTMLElement>): void {
            if(htmlElems === null || htmlElems.item(currIndex) === null) return;

            if(htmlElems.item(currIndex).getAttribute(attribute) === attributeValue) {
                elemArray.push(htmlElems.item(currIndex));
            }

            this.populateArrayByAttribute(attribute, attributeValue, htmlElems.item(currIndex).children, 0, elemArray);
            if(currIndex !== htmlElems.length - 1) {
                this.populateArrayByAttribute(attribute, attributeValue, htmlElems, currIndex + 1, elemArray);
            } 
    }

    constructor(htmlElements: Array<HTMLElement>) {
        this.elements = htmlElements;
    }

    getElements(): Array<HTMLElement> {
        return this.elements;
    }
//     getCssProperty(propertyName: any): string {
//         const elemStyle: CSSStyleDeclaration = this.element.style; 
//         return elemStyle.getPropertyValue(propertyName);
//     }

//     setCssProperty(propertyName: any, value: string): void {
//         let currInlineStyle: CSSStyleDeclaration = this.element.style;
//         currInlineStyle.setProperty(propertyName, value);
//     }

//     setCssProperties(propertiesAsObject: {[key: string]: string}): void {
//         for(const key in propertiesAsObject) {
//             this.setCssProperty(key, propertiesAsObject[key]);
//         }
//     }

//     setText(newText: string): void {
//         this.element.textContent = newText;
//     }

    getText(index: number = 0): string {
        const textContent = this.elements[index].textContent;
        if(textContent !== null) return textContent;
        return "";
    }

//     getAttr(attribute: string): string {
//         let attributeValue: string | null = this.element.getAttribute(attribute);
//         if(attributeValue === null) return "";
//         return attributeValue;
//     }

//     setAttr(attribute: string, value: string): void {
//         this.element.setAttribute(attribute, value);
//     }

//     removeAttr(attribute: string): void {
//         this.element.removeAttribute(attribute);
//     }

//     getHtml(): string {
//         return this.element.innerHTML;
//     }
   
//     click(callback: Function): void {
//         this.element.addEventListener("click", (event: MouseEvent) => {
//             callback();
//         })
//     }

//     blur(callback: Function): void {
//         this.element.addEventListener("blur", () => {
//             callback();
//         });
//     }

//     focus(callback: Function): void {
//         this.element.addEventListener("focus", () => {
//             callback();
//         })
//     }

//     addChild(newChildElement: HTMLElement): void {
//         this.element.appendChild(newChildElement);
//     }

//     children(): HTMLCollection {
//         return this.element.children;
//     }

//     addClass(newClass: string): void {
//         if(!this.CLASS_NAME_REGEX.test(newClass)) {
//             throw new Error(`Invalid characters in class name: '${newClass}'`);
//         }

//         newClass = this.element.className.length > 0 ? ` ${newClass}` : newClass;
//         let newClassName = this.element.className + newClass;
//         this.element.className = newClassName;
//     }

//     getClass(): string {
//         return this.element.className;
//     }

//     removeClass(classToRemove: string): void {
//         let startIndex = this.element.className.indexOf(classToRemove);
//         let endIndex = startIndex + classToRemove.length;
//         let oldClassName = this.element.className;
        
//         if(startIndex < 0) return;

//         if(endIndex !== oldClassName.length) {
//             endIndex++;
//         } else {
//             startIndex--;
//         }
        
//         let newClassNames = oldClassName.slice(0, startIndex) + oldClassName.slice(endIndex, oldClassName.length);
//         this.element.className = newClassNames;
//     }
// }

}

module.exports = JQuery;