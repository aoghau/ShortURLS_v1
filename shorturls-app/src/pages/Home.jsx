import { Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const navigate = useNavigate();
  const list = useSelector(state => state.list);
const isWrapAdmin = useSelector(state => state.isWrapAdmin);
const wrapName = useSelector(state => state.wrapName);
  const dispatch = useDispatch();
  const [create, setCreate] = useState({
    link: '',
  })

  function  isCanDelete (name) {
   if (isWrapAdmin) return false
   if(wrapName === name) return false
   return true
  }  const apiUrl = `http://localhost:7268/home`
  const getList = () => {
   
    const headers = new Headers({
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'uk,en-US;q=0.9,en;q=0.8',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      Authorization: 'bearer ' + localStorage.getItem('bearer'),
    });
    
    fetch(apiUrl, {
      method: 'GET',
      headers: headers
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: 'UPDATE_DATA', payload: json });
      })
  }
  const bearerToken = localStorage.getItem('bearer');
  useEffect(() => {
    if( bearerToken){getList(); }else{
      fetch(apiUrl, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((json) => {
          dispatch({ type: 'UPDATE_LIST', payload: json.list });
        })
    }
   
  }, [])
  const createObject = (newObject) => {
    fetch(`http://localhost:7268/url?url=${newObject}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + localStorage.getItem('bearer'),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        getList()
        console.log('New object created:', json)        
      })
      .catch((err) => console.log('error'))
  }
  const deleteObject = (objectId) => {
    fetch(`http://localhost:7268/id?id=${objectId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('bearer'),
      },
    })
      .then((res) => {
        if (res.ok) {
          getList()
          console.log('Object deleted')
        } else {
          console.log('Failed to delete object')
        }
      })
      .catch((err) => console.log('error'))
  }

  const linkHeandler = (e) => {
    setCreate({
      ...create,
      [e.target.name]: e.target.value,
    })
  }
  const logOutUser = () => {
localStorage.clear()
navigate('/')
  }
  function handleSubmit(e) {
    e.preventDefault()

    createObject(create.link)
  }

  return (
    <div className="containe logup__wrapper is-flex is-flex-direction-column">
      <div>
        <h1 className="content has-text-centered logup__title is-3 ">
          Add new link
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                name="link"
                placeholder="Enter link"
                value={create.link}
                onChange={(e) => linkHeandler(e)}
              />
            </div>
          </div>
          <button type="submit" className="button is-danger title is-5  btn">
            Add
          </button>
        </form>
      </div>
        <table className="table">
          <thead ><tr>
            <th >originalUrl</th>
            <th >shortUrl</th>
            <th >Detail</th>
            <th >Delete</th>
          </tr></thead>
          
            <tbody>{list.map(item => <tr >
            <td >
              <a href={item.originalUrl}>
                {item.originalUrl}
              </a>
            </td>
            <td >
              <a href={item.originalUrl}>
                {item.url}
              </a>
            </td>
            <td >
            <Link to={`/${item.id}/detail`}>
        <button type="button" className="button is-danger title is-5  btn">
         Details
        </button>
      </Link>
            </td>
            <td >
            <button type="button" className="button is-danger title is-5  btn" disabled={isCanDelete(item.author)} onClick={()=> deleteObject(item.id)}>
         Delete
        </button>
            </td>
          </tr>)}</tbody>
        
        </table>
      <Link to={`/about`}>
        <button type="button" className="button is-danger title is-5  btn">
          About
        </button>
      </Link>
      {bearerToken &&   <button type="button" className="button is-danger title is-5  btn" onClick={()=> logOutUser()}>
          LogOut
        </button>}
   
    </div>
  )
}
export default Home