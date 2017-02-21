import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert the innerHTML of the todo is the text you initially set
        const node = TestUtils.renderIntoDocument(<div> 
            <ToDoItem text={"textfortest"} done={false}/> </div>)
        const todoItem = findDOMNode(node).children[0]
        expect(todoItem.children).to.have.length(3)
        expect(todoItem.children[1].innerHTML).to.equal('textfortest')
    })

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert there is no child with classname 'completed'
        const node = TestUtils.renderIntoDocument(<div> 
            <ToDoItem text={"textfortest"} done={false}/> </div>)
        const todoItem = findDOMNode(node).children[0]
        expect(todoItem.children).to.have.length(3)
        expect(findByClassname(todoItem.children, 'completed')).to.equal(null)
    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        // use TestUtils.renderIntoDocument
        // when the checkbox is clicked via TestUtils.Simulate.click()
        // we expect the variable toggled to be true
        const todoItem = TestUtils.renderIntoDocument(<div>
            <ToDoItem done={toggled} toggle={() => (toggled=true)} />
        </div>).children[0]
        TestUtils.Simulate.click(todoItem.children[0])
        expect(toggled).to.equal(true)
    })

    it('should remove an item when clicked', () => {
        let removed = false
        // use TestUtils.renderIntoDocument
        // when the remove button is clicked via TestUtils.Simulate.click()
        // we expect the variable removed to be true
        const todoItem = TestUtils.renderIntoDocument(<div>
            <ToDoItem remove={() => (removed=true)} />
        </div>).children[0]
        TestUtils.Simulate.click(todoItem.children[2])
        expect(removed).to.equal(true)
    })

    it('should display a completed ToDo', () => {
        // use TestUtils.renderIntoDocument
        // the item should have done=true
        // assert that the rendered className is "completed"
         const todoItem = TestUtils.renderIntoDocument(<div>
            <ToDoItem done={true} />
        </div>).children[0]
        expect(todoItem.children[1].className).to.equal('completed')
    })

})
