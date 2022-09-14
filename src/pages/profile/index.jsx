import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TokenCard from '../../components/TokenCard/TokenCard'
import DualRingLoader from '../../components/Icon/DualRingLoader'
import Navigator from '../../components/Navigator/Navigator'
import parseNanoSecToMs from '../../utils/parseDateToMs'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Profile = ({ contract, currentUser }) => {
  const history = useHistory()

  const [createdTokens, setCreatedTokens] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getCreatedGames() {
    try {
      const pages = await contract.nft_tokens_for_owner({ account_id: currentUser.accountId})
      console.log("test result: ", pages)
      return pages
    } catch (error) {
      console.log("test error: ", error)
      return error.message
    }
  }

  const assignCreatedTokens = () => {
    getCreatedGames()
      .then((res) => {setCreatedTokens(res)})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setLoading(true)
    assignCreatedTokens()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [tokenId, setTokenId] = useState('')

  const handleSubmit = async (e) => {
    history.push('/token/' + tokenId)
  }


  return (
    <Wrapper>
      <article className="w-full flex bd-how">
        <div className="mx-auto flex flex-col">
        </div>
      </article>
      <header>All Tokens</header>
      {loading ? (
        <LoaderWrapper className="my-20">
          <DualRingLoader width={100} height={100} />
        </LoaderWrapper>
      ) : (
        <main className="my-20 mx-auto grid grid-cols-3 gap-10">
          {
            createdTokens != null &&
            createdTokens.map((el) => {
            console.log(el)
            return (
              <TokenCard
                key={el.series_id}
                id={el.series_id}
                createdAt={
                  el.metadata.issued_at > 0 && new Date(parseNanoSecToMs(el.metadata.issued_at))
                }
                creator={el.owner_id}
                startDate={
                  el.metadata.starts_at > 0 && new Date(parseNanoSecToMs(el.metadata.starts_at))
                }
                endDate={el.metadata.expires_at > 0 && new Date(parseNanoSecToMs(el.metadata.expires_at))}
                media={el.metadata.media}
                contract={contract}
                title={el.metadata.title}
              />
            )
          })}
        </main>
      )}
      <Navigator pageNum={1} next prev={false} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & > .bd-how {
    padding: 5rem 10rem 6rem;
    background: #e2e6e9;
  }
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
