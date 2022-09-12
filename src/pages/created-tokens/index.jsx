import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TokenCard from '../../components/TokenCard/TokenCard'
import DualRingLoader from '../../components/Icon/DualRingLoader'
import Navigator from '../../components/Navigator/Navigator'
import parseNanoSecToMs from '../../utils/parseDateToMs'

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const CreatedTokens = ({ contract }) => {
  const [createdTokens, setCreatedTokens] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getCreatedGames() {
    try {
      const pages = await contract?.getCreatedGames({ page: 0 })
      return pages
    } catch (error) {
      return error.message
    }
  }

  const assignCreatedTokens = () => {
    getCreatedGames()
      .then((res) => setCreatedTokens(res?.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setLoading(true)
    assignCreatedTokens()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrapper>
      <header>Created Tokens</header>
      {loading ? (
        <LoaderWrapper className="my-20">
          <DualRingLoader width={100} height={100} />
        </LoaderWrapper>
      ) : (
        <main className="my-20 mx-auto grid grid-cols-3 gap-10">
          {createdTokens?.map((el) => {
            console.log(el)
            // if (el.status === 0) {
            return (
              <TokenCard
                key={el.id}
                id={el.id}
                createdAt={
                  el.createdAt > 0 && new Date(parseNanoSecToMs(el.createdAt))
                }
                creator={el.createdBy}
                startDate={
                  el.started > 0 && new Date(parseNanoSecToMs(el.started))
                }
                endDate={el.ended > 0 && new Date(parseNanoSecToMs(el.ended))}
                players={el.players}
                contract={contract}
                status={el.status}
              />
            )
            // }
          })}
        </main>
      )}
      <Navigator pageNum={1} next prev={false} />
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

export default CreatedTokens
