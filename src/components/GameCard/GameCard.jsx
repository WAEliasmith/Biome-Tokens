import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import dateFormatter from '../../utils/dateFormatter'
import Timer from '../Timer/Timer'

const GameCard = ({
  creator,
  startDate,
  endDate,
  players,
  id,
  createdAt,
  status,
}) => {
  const [counter, setCounter] = useState('00:00')

  useEffect(() => {
    if (endDate) {
      const sTime = new Date(endDate)
      const eTime = new Date()
      const countdownTime = sTime.getTime() - eTime.getTime()
      const minutes = Math.floor(
        (countdownTime % (1000 * 60 * 60)) / (1000 * 60),
      )
      const seconds = Math.floor((countdownTime % (1000 * 60)) / 1000)
      var intervalVar = setInterval(() => {
        if (countdownTime > 0) {
          setCounter(
            `${minutes < 10 ? '0' + minutes : minutes}:${
              seconds < 10 ? '0' + seconds : seconds
            }`,
          )
        } else {
          setCounter('00:00')
        }
      }, 1000)
    }

    return () => clearInterval(intervalVar)
  })

  return (
    <Wrapper className=" px-8 py-6">
      <div>
        {status === 1 && (
          <div className="mb-10 flex justify-center">
            <Timer time={counter} />
          </div>
        )}
        <div>
          <h3 className="text-lg font-medium">Creator: {creator}</h3>
          {createdAt && (
            <h3 className="text-lg font-medium my-3">
              Created At: {dateFormatter(createdAt)}
            </h3>
          )}

          {startDate && (
            <h3 className="text-lg font-medium my-3">
              Started At: {dateFormatter(startDate)}
            </h3>
          )}
          {endDate && (
            <h3 className="text-lg font-medium">
              Ends At: {dateFormatter(endDate)}
            </h3>
          )}
          <h3 className="text-lg font-medium mt-3 mb-6">Players: {players}</h3>
        </div>
      </div>
      <div>
        <Navigate to={`/game/${id}`}> View</Navigate>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 200px;
  width: 100%;
  max-width: 750px;
  background: linear-gradient(138.85deg, #ffffff -38.72%, #ffffff 153.95%);
  border: 12px solid rgba(225, 225, 225, 0.43);
  box-shadow: 0px 28px 118px rgba(109, 108, 115, 0.12);
  border-radius: 20px;
  & > .bd-amount {
    width: 86px;
    height: 86px;
    background: #161616;
    & .inner-circle {
      width: 80px;
      height: 80px;
      background: #f5f5f5;
      margin: 3px 0 0 4px;
    }
  }
`

const Navigate = styled(Link)`
  text-decoration: underline;
  text-align: center;
  display: block;
`

export default GameCard
