import { useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Big from 'big.js'

const txFee = Big(0.5)
  .times(10 ** 24)
  .toFixed()

const GAS = Big(3)
  .times(10 ** 13)
  .toFixed()

const Mint = ({ contract }) => {
  const [tokenId, setTokenId] = useState('')
  const [metadata, setMetadata] = useState('')
  const [royalty, setRoyalty] = useState('')
  const [price, setPrice] = useState('')
  const [goodRange, setGoodRange] = useState('')
  const [badRange, setBadRange] = useState('')
  const [charityId, setCharityId] = useState('')
  const [oracleId, setOracleId] = useState('')

  const MintToken = async () => {
    const mintData = {
      id: tokenId,
      metadata: metadata,
      royalty: royalty,
      price: price,
      good_range: goodRange,
      bad_range: badRange,
      charity_id: charityId,
      oracle_id: oracleId,
    }
    try {
      //await contract.Mint(mintData, GAS, txFee)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Wrapper>
      <section className="bd-how py-12 flex items-center justify-between">
        <article className="ml-32 w-1/2">
          <h2 className="text-3xl text-center font-bold mb-16">
            Minting
          </h2>
          <form className="w-full flex flex-col items-center">
            <Input
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Enter Token ID"
            />
            <Input
              value={metadata}
              onChange={(e) => setMetadata(e.target.value)}
              placeholder="Enter Metadata"
            />
            <Input
              value={royalty}
              onChange={(e) => setRoyalty(e.target.value)}
              placeholder="Enter Royalty"
            />
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Price"
            />
            <Input
              value={goodRange}
              onChange={(e) => setGoodRange(e.target.value)}
              placeholder="Enter GoodRange"
            />
            <Input
              value={badRange}
              onChange={(e) => setBadRange(e.target.value)}
              placeholder="Enter BadRange"
            />
            <Input
              value={charityId}
              onChange={(e) => setCharityId(e.target.value)}
              placeholder="Enter Charity Id"
            />
            <Input
              value={oracleId}
              onChange={(e) => setOracleId(e.target.value)}
              placeholder="Enter Oracle Id"
            />

            <Button
              style={{ height: 55 }}
              className="mt-12 w-max"
              onClick={MintToken}
            >
              Mint
            </Button>
          </form>
        </article>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & > .bd-intro {
    max-width: 75%;
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

export default Mint
