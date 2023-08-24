import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const LinkUrl = () => {
  const apiUrl = `http://localhost:7268/home`
  const { linkUrl } = useParams()
  const data = useSelector(state => state);
  const dispatch = useDispatch();
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

        if(json.list.find((item) => item.url === window.location.href.replace("http://", ""))){
            const selectedItem = json.list.find((item) => item.url === window.location.href.replace("http://", ""))
            window.open( selectedItem.originalUrl,'_self')}
        
      })
  }
  useEffect(() => {
    const bearerToken = localStorage.getItem('bearer');

    if (bearerToken) {
      getList(); 
    } else {
      fetch(apiUrl, {
        method: 'GET',
        
      })
        .then((res) => res.json())
        .then((json) => {
          try {
            if (json && json.list && Array.isArray(json.list)) {
              const selectedItem = json.list.find((item) => item.url === window.location.href.replace("http://", ""));
              if (selectedItem) {
                console.log(selectedItem);
                window.open(selectedItem.originalUrl, '_self');
              } else {
                console.log("Selected item not found.");
              }
            } else {
              console.log("Invalid JSON data or data structure.");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }, []);

  return (
    <div className="containe logup__wrapper is-flex is-flex-direction-column">
    </div>
  )
}
export default LinkUrl