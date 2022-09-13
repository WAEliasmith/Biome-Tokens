import { useEffect, useState } from 'react'
import styled from 'styled-components'
import TokenCard from '../../components/TokenCard/TokenCard'
import Navigator from '../../components/Navigator/Navigator'
import parseNanoSecToMs from '../../utils/parseDateToMs'

const Profile = ({ contract, currentUser }) => {
  const [tokens, setTokens] = useState([])

  const getProfile = async () => {
    const profile = await contract?.getProfileDetails({
      account: currentUser?.accountId,
    })

    profile.forEach(async (el) => {
      const data = await contract?.getGameDetails({ gameId: el })
      setTokens((prev) => [data[0], ...prev])
    })
  }

  useEffect(() => {
    if (currentUser) {
      getProfile()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(tokens)

  return (
    <Wrapper>
      <header>Profile</header>
      <main className="my-20 mx-auto grid grid-cols-2 gap-10">
        {
          tokens?.map((el) => {
            if (el) {
              return (
                <TokenCard
                  key={el.id}
                  id={el.id}
                  creator={el.createdBy}
                  startDate={
                    el.started > 0 && new Date(parseNanoSecToMs(el.started))
                  }
                  endDate={el.ended > 0 && new Date(parseNanoSecToMs(el.ended))}
                  players={el.players}
                  contract={contract}
                  currentUser={currentUser}
                  status={el.status}
                  createdAt={
                    el.createdAt > 0 && new Date(parseNanoSecToMs(el.createdAt))
                  }
                  variant="completed"
                />
              )
            }

            return null
          })
        }
      </main>
      <Navigator pageNum={1} next={false} prev={false} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
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

  & > main {
    max-width: 85%;

    h1 {
      font-weight: 800;
      font-size: 56px;
      line-height: 84px;
      letter-spacing: -0.03em;
      color: #1e1b1b;
    }
  }

  & > .bd-how {
    padding: 5rem 10rem 6rem;
    background: #e2e6e9;
  }
`

export default Profile