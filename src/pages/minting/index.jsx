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
  const [tokenId, setTokenId] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [royalty, setRoyalty] = useState("")
  const [price, setPrice] = useState("")
  const [goodRange, setGoodRange] = useState("")
  const [badRange, setBadRange] = useState("")
  const [charityId, setCharityId] = useState("")
  const [oracleId, setOracleId] = useState("")
  const [urls, setUrls] = useState("")
  const [copies, setCopies] = useState("")


  const MintToken = async () => {
    console.log("test minting start")
    try {
      const metadata = {
        title: title,
        description: description,
        copies: parseInt(copies),
      }
      console.log("test minting continue: ", metadata)

      var test = await contract.create_series(
        { id: parseInt(tokenId),
          metadata: metadata,
          charity_id: charityId,
          oracle_id: oracleId,
          good_range: parseFloat(goodRange),
          bad_range: parseFloat(badRange),
          all_media: urls,
          price: price + "000000000000000000000000",
          }, GAS, txFee)
      console.log("test minting: ", test)
    } catch (error) {
      console.log("test: ", error)
    }
  }

  return (
    <Wrapper>
      <section className="w-full bd-how py-12 flex items-center justify-between">
        <article className="mx-auto">
          <h2 className="text-3xl text-center font-bold mb-16">
            Minting
          </h2>
          <form className="flex flex-col items-center">
            <Input
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Enter Token ID"
            />
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
            />
            <Input
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              placeholder="Enter Copies"
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
            <div className="my-4"> Enter 3 image Urls, seperated by ", ". Put the healthy image first, and the unhealthy image last</div>
            <Input
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="Enter urls here"
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
