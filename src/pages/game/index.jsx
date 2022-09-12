import { utils } from 'near-api-js'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import DualRingLoader from '../../components/Icon/DualRingLoader'
import ModalComponent from '../../components/Modal'
import Timer from '../../components/Timer/Timer'
import useQuery from '../../hooks/useQuery'
import dateFormater from '../../utils/dateFormatter'
import parseNanoSecToMs from '../../utils/parseDateToMs'
import { LoaderWrapper } from '../created-games'

const CompletedGames = ({ contract }) => {
  const { id } = useParams()
  const query = useQuery()
  const history = useHistory()
  const [data, setData] = useState(null)
  const [players, setPlayers] = useState(null)
  const [loading, setLoading] = useState(false)
  const [counter, setCounter] = useState('00:00')
  const [rollModal, setRollModal] = useState(false)
  const [roll, setRoll] = useState([])

  async function getGameDetails() {
    setLoading(true)
    try {
      const [game] = await contract?.getGameDetails({ gameId: id })

      console.log(game)
      const players = await contract?.getPlayersDetails({ gameId: id })

      setPlayers(players)
      setData(game)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getGameDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRoll = (dice) => {
    if (Array.isArray(dice)) {
      setRoll(dice)
      setRollModal(true)
    } else {
      history.push(history.pathname)
    }
  }
  return (
    <Wrapper>
      <header style={{ textAlign: 'center' }}>GAME ID: {id}</header>
      {loading ? (
        <LoaderWrapper className="mt-20">
          <DualRingLoader width={100} height={100} />
        </LoaderWrapper>
      ) : data ? (
        <main className="mt-10 mx-auto grid ">
          <div className="bd-game-details grid-cols-2 gap-10 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">
                Creator: {data?.createdBy}
              </h3>
              <h3 className="text-2xl font-semibold">
                Created:{' '}
                {dateFormater(
                  data?.createdAt &&
                    new Date(parseNanoSecToMs(data?.createdAt)),
                )}
              </h3>
            </div>
            <div className="mt-8 flex grid-cols-2 gap-10 items-center justify-between">
              {data?.started > 0 && (
                <h3 className="text-2xl font-semibold">
                  Started:{' '}
                  {dateFormater(new Date(parseNanoSecToMs(data?.started)))}
                </h3>
              )}
              {data?.ended > 0 && (
                <h3 className="text-2xl font-semibold">
                  Ended: {dateFormater(new Date(parseNanoSecToMs(data?.ended)))}
                </h3>
              )}
            </div>
            <div className="mt-8 flex grid-cols-2 gap-10 items-center justify-between">
              <h3 className="text-2xl font-semibold">
                Prize: {utils.format.formatNearAmount(data?.prize)} NEAR Token
              </h3>
              <h3 className="text-2xl font-semibold">
                Status:{' '}
                {data?.status === 0
                  ? 'Created'
                  : data?.status === 1
                  ? 'Active'
                  : data?.status === 2
                  ? 'Ended'
                  : '...'}
              </h3>
            </div>
            {data?.status === 1 && (
              <div className="mt-8 flex items-center justify-center">
                <Timer time={counter} />
              </div>
            )}
            <div className="full-width">
              <h3 className="text-2xl text-white font-semibold mt-32 mb-3 text-center p-3 full-width bg-blue-900">
                Players ({data?.players})
              </h3>

              <div
                style={{ maxHeight: 350, overflowY: 'auto' }}
                className="mt-8 grid grid-cols-3 gap-10"
              >
                {players?.map((player) => (
                  <div key={player?.playerId}>
                    <p>{player.playerId}</p>

                    {data.status === 2 && (
                      <>
                        <small className="my-1 block">
                          Dice 1: {player?.roll1 || '-'}
                        </small>
                        <small className="my-1 block">
                          Dice 2: {player?.roll2 || '-'}
                        </small>
                      </>
                    )}
                    <small className="my-1 block">
                      Joined On:{' '}
                      {parseInt(player?.timeJoined) > 0
                        ? dateFormater(
                            new Date(parseNanoSecToMs(player?.timeJoined)),
                          )
                        : '-'}
                    </small>

                    <small className="my-1 block">
                      Rolled On:{' '}
                      {player?.timeRolled > 0
                        ? dateFormater(
                            new Date(parseNanoSecToMs(player?.timeRolled)),
                          )
                        : '-'}
                    </small>
                    <small className="my-1 block">
                      Claimed Win: {player?.claimedWin ? 'Yes' : 'No'}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <footer className="h-20 mt-16" />
        </main>
      ) : (
        <h3
          className="text-2xl font-semibold my-20 text-center p-3 full-width "
          variant="mint"
        >
          Game not fetched
        </h3>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 2rem auto 0;

  & > header {
    max-width: 85%;
    margin: 2rem auto 8rem;
    padding: 1.8rem 0;
    text-align: center;
    background: #394149;
    color: #fff;
    font-weight: bold;
    font-size: 2rem;
    line-height: 140%;
    border: 14px solid #e3e3e3;
    border-radius: 8px;
  }

  & > .bd-game-details {
    max-width: 85%;
    margin: auto;
    height: 100%;
    width: 100%;
    padding: 3rem 5rem 10rem;
    background: linear-gradient(138.85deg, #ffffff -38.72%, #ffffff 153.95%);
    border: 12px solid rgba(225, 225, 225, 0.43);
    box-shadow: 0px 28px 118px rgba(109, 108, 115, 0.12);
    border-radius: 20px;
  }

  & > footer {
    background: #c4c4c4;
  }
`

export default CompletedGames
