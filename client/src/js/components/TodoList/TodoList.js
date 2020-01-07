import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";

export default function TodoList({todos, limit, order, handleSelect, handleModal, handleYes, handleNo, modalId}){
    return (
        <Fragment>
            <label htmlFor="per-page-dropdown">Per Page:</label>
            <select id="per-page-dropdown"
                    value={ limit }
                    onChange={ (e) => handleSelect(e, 'limit') }
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
            <label htmlFor="order-dropdown">Sort by:</label>
            <select id="order-dropdown"
                    value={ order }
                    onChange={ (e) => handleSelect(e, 'order') }
            >
                <option value="ph">Priority High</option>
                <option value="pl">Priority Low</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="new">Newest</option>
                <option value="old">Oldest</option>
            </select>
            {
                todos.length > 0 && todos.map((todo, i) => {
                    return (
                        <div key={ i }>
                            { todo.id }: { todo.title } - { todo.priority } - { todo.completed ? 'Complete' : 'Incomplete' }
                            <Link to={ '/todo/' + todo.id }>Edit</Link>
                            <span onClick={() => handleModal(todo.id)}>Delete</span>
                            {
                                modalId === todo.id ? (
                                    <Modal>
                                        <p>Are you sure you want to delete this todo?</p>
                                        <p>
                                            <button onClick={() => handleYes(todo.id)}>Yes</button>
                                            <button onClick={handleNo}>No</button>
                                        </p>
                                    </Modal>
                                ) : null
                            }
                        </div>
                    );
                })
            }
        </Fragment>
    );
}
