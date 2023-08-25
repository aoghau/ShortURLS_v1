import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()
  const onBack = () => {
    navigate(-1)
  }
  return (
    <div className="containe logup__wrapper is-flex is-flex-direction-column">
      <p className="question__question content has-text-centered">This web app uses Base64 encryption to transform your link into something like: localhost:3000/xyz, while pragamtically mantaining the functionality of the link</p>
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
export default About