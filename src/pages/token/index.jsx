import { utils } from 'near-api-js'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import DualRingLoader from '../../components/Icon/DualRingLoader'
import ModalComponent from '../../components/Modal'
import Timer from '../../components/Timer/Timer'
import useQuery from '../../hooks/useQuery'
import dateFormater from '../../utils/dateFormatter'
import { decodeArgs, GAS, txFee, txReturnArgsFromHash } from '../../utils/near'
import parseNanoSecToMs from '../../utils/parseDateToMs'
import { LoaderWrapper } from '../created-tokens'

const CompletedTokens = ({ contract, currentUser }) => {
  const { id } = useParams()
  const query = useQuery()
  const history = useHistory()
  const hash = query.get('transactionHashes')
  const [winners, setWinners] = useState(null)
  const [data, setData] = useState(null)
  const [players, setPlayers] = useState(null)
  const [userPlayer, setUserPlayer] = useState(null)
  const [claimStats, setClaimStats] = useState(null)
  const [rolled, setRolled] = useState('')
  const [loading, setLoading] = useState(false)
  const [btnLoad, setBtnLoad] = useState(false)
  const [counter, setCounter] = useState('00:00')
  const [rollModal, setRollModal] = useState(false)
  const [roll, setRoll] = useState([])

  async function getTokenDetails() {
    setLoading(true)
    try {
      const [token] = await contract?.getGameDetails({ gameId: id })

      console.log(token)
      const players = await contract?.getPlayersDetails({ gameId: id })
      const [userPl] = players.filter(
        (val) => val.playerId === currentUser?.accountId,
      )

      if (token.status === 2) {
        const resWinners = await contract?.getWinners({ gameId: id })
        if (resWinners) {
          setWinners(resWinners)
          console.log(resWinners)
          if (userPl) {
            setRolled(userPl?.timeRolled > 0 ? 'Rolled' : 'Roll')
            setClaimStats(
              resWinners?.includes(userPl?.playerId)
                ? 'won'
                : resWinners?.includes(userPl?.playerId) && userPl?.claimedWin
                ? 'claimed'
                : 'lost',
            )
          }
        } else {
          setRolled('Join')
          setClaimStats(false)
        }
      } else {
        if (userPl) {
          setRolled(userPl?.timeRolled > 0 ? 'Rolled' : 'Roll')
        } else {
          setRolled('Join')
        }
      }

      setUserPlayer(userPl)
      setPlayers(players)
      setData(token)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (hash && currentUser) {
      txReturnArgsFromHash({ hash, accountId: currentUser.accountId }).then(
        (res) => {
          console.log(decodeArgs(res))
          // console.log(JSON.parse()
          handleRoll(decodeArgs(res))
        },
      )
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getTokenDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = async () => {
    setBtnLoad(true)
    try {
      if (data?.status === 2 && winners?.includes(currentUser.accountId)) {
        await contract?.claimWinnings({ gameId: id })
      }

      if (data?.status !== 2) {
        if (userPlayer) {
          await contract.rollDice({ gameId: id })
        } else {
          await contract.joinToken({ gameId: id }, GAS, txFee)
        }
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setBtnLoad(false)
      getTokenDetails()
    }
  }

  const renderButton = () => {
    if (data?.status === 2) {
      return (
        userPlayer && (
          <Button
            disabled={claimStats !== 'won'}
            variant={
              claimStats === 'lost'
                ? 'red'
                : claimStats === 'won'
                ? 'mint'
                : 'disabled'
            }
            onClick={handleClick}
          >
            {btnLoad
              ? 'Processing...'
              : claimStats === 'lost'
              ? 'Lost'
              : claimStats === 'won'
              ? 'Claim Win'
              : 'Claimed'}
          </Button>
        )
      )
    }

    return (
      <Button
        disabled={rolled === 'Rolled'}
        variant={
          rolled === 'Rolled'
            ? 'disabled'
            : rolled === 'Roll'
            ? 'mint'
            : 'secondary'
        }
        onClick={handleClick}
      >
        {btnLoad ? 'Processing...' : rolled}
      </Button>
    )
  }

  useEffect(() => {
    var intervalVar = setInterval(() => {
      if (data?.ended > 0 && data?.status === 1) {
        const sTime = new Date(parseNanoSecToMs(data?.ended))
        const eTime = new Date()
        const countdownTime = sTime.getTime() - eTime.getTime()
        const minutes = Math.floor(
          (countdownTime % (1000 * 60 * 60)) / (1000 * 60),
        )
        const seconds = Math.floor((countdownTime % (1000 * 60)) / 1000)
        if (countdownTime > 0) {
          setCounter(
            `${minutes < 10 ? '0' + minutes : minutes}:${
              seconds < 10 ? '0' + seconds : seconds
            }`,
          )
        } else {
          setCounter('00:00')
        }
      }
    }, 1000)

    return () => clearInterval(intervalVar)
  }, [data])

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
      <header style={{ textAlign: 'center' }}>TOKEN ID: {id}</header>
      {loading ? (
        <LoaderWrapper className="mt-20">
          <DualRingLoader width={100} height={100} />
        </LoaderWrapper>
      ) : data ? (
        <main className="mt-10 mx-auto grid ">
          <div className="bd-token-details grid-cols-2 gap-10 relative">
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
            <div className="full-width mt-10 flex flex-col items-center">
              {renderButton()}
            </div>
          </div>
          <footer className="h-20 mt-16" />
        </main>
      ) : (
        <h3
          className="text-2xl font-semibold my-20 text-center p-3 full-width "
          variant="mint"
        >
          Token not fetched
        </h3>
      )}

      <ModalComponent
        dice1={roll[0]}
        dice2={roll[1]}
        open={rollModal && roll.length > 0}
        handleClose={() => {
          query.delete('transactionHashes')
          history.replace({
            search: query.toString(),
          })

          setRollModal(false)
        }}
      />
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

  & > .bd-token-details {
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

export default CompletedTokens
