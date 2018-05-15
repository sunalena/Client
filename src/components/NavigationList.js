import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap'

const NavigationList = ({ error, loading, header, itemsArray, startPath, editMode }) => (
  <div>
    <h3>{header}</h3>
    <ListGroup>
      {itemsArray.map(el => (
        <ListGroupItem
          key={el.id}
          onClick={(key => event => console.log(key))(el.id)}
        >
          <Link to={`${startPath}/${el.id}`} className={!editMode ? "" : "text-success"}>{el.name}</Link>
          <Badge color="secondary" style={{ marginLeft: '5px' }}>
            {el.items.totalCount}
          </Badge>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
)

export default NavigationList
