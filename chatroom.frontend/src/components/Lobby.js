import { useState } from "react"
import { Button, Form } from "react-bootstrap"

export const Lobby = ({joinRoom}) => {

    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    return <Form className="lobby"
        onSubmit = {_ => {
            _.preventDefault();
            _.joinRoom(user,room);
            }
        }>

        <Form.Group>
            <Form.Control className="mb-2" placeholder="name" onChange={_ => setUser(_.target.value)} />
            <Form.Control className="mb-2" placeholder="room" onChange={_ => setRoom(_.target.value)} />
        </Form.Group>
        <Button variant="danger" type="submit" disabled={!user || !room}>Join</Button>
    </Form>
}