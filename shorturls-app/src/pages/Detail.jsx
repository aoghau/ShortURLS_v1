import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Detail = () => {
  const { id } = useParams()
  const data = useSelector((state) => state)

  const selectedItem = data.list.find((item) => item.id === Number(id))
  const navigate = useNavigate()
  const onBack = () => {
    navigate(-1)
  }
  return (
    <div className="containe logup__wrapper is-flex is-flex-direction-column">
      <h1 className="question__question content has-text-centered">Detail</h1>
      <div class="columns">
  <div class="column">
  <p className="question__question content has-text-centered">
        author
      </p>
      <p className="question__question content has-text-centered">
      url
      </p>
      <p className="question__question content has-text-centered">
       shortUrl
      </p>
      <p className="question__question content has-text-centered">
       data created
      </p>
  </div>
  <div class="column">
  <p className="question__question content has-text-centered">
        {selectedItem.author}
      </p>
      <p className="question__question content has-text-centered">
        {selectedItem.originalUrl}
      </p>
      <p className="question__question content has-text-centered">
        {selectedItem.url}
      </p>
      <p className="question__question content has-text-centered">
        {selectedItem.dateCreated.substring(0, 10)}
      </p>
  </div>
</div>
      <button
        type="button"
        className="button is-danger title is-5  btn"
        onClick={onBack}
      >
        Back
      </button>
    </div>
  )
}
export default Detail