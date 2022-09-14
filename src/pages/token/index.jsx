import Big from 'big.js'
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
      const token = await contract.get_series_details({ id: parseInt(id) })

      console.log("test token:", token)

      setData(token)
    } catch (error) {
      console.log("test failed: ",error)
    }
    console.log("test 23232: ", data)

    setLoading(false)
  }

  useEffect(() => {
    if (hash && currentUser) {
      txReturnArgsFromHash({ hash, accountId: currentUser.accountId }).then(
        (res) => {
          console.log(decodeArgs(res))
          // console.log(JSON.parse()
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
    var txFee;
    if(data.price != null && String(data.price).includes("e")){
      txFee = Big(parseInt(data.price)+0.01)
      .times(10 ** 24)
      .toFixed()
    } else {
      txFee = Big(parseFloat(data.price)+0.01)
      .times(10 ** 24)
      .toFixed()
    }
    
    const GAS = Big(3)
    .times(10 ** 13)
    .toFixed()

    setBtnLoad(true)
    try {
      console.log("test I am binting now: ", currentUser.accountId, )
      await contract.nft_mint({ id: String(id), receiver_id: currentUser.accountId }, GAS, txFee)
      console.log("test succeees: ")
      
    } catch (error) {
      console.log("test buy failed: ", error.message)
    } finally {
      setBtnLoad(false)
      getTokenDetails()
    }
  }

  const renderButton = () => {
    return (
      <Button
        onClick={handleClick}
      >
        Buy Token
      </Button>
    )
  }

  return (
    <Wrapper>
      <header style={{ textAlign: 'center' }}>SERIES ID: {id}</header>
      {loading ? (
        <LoaderWrapper className="mt-20">
          <DualRingLoader width={100} height={100} />
        </LoaderWrapper>
      ) : data ? (
        <main className="mt-10 mx-auto grid ">
        <div className="width-full mx-auto flex">
          <img id="img1" src={data?.metadata.media} />
        </div>
          <div className="bd-token-details grid-cols-2 gap-10 relative">
            <div className="flex flex-col items-center justify-between">
              <h3 className="text-2xl font-semibold">
                Owner: {data?.owner_id}
              </h3>
              <h3 className="text-2xl font-semibold">
                Title: {data?.metadata.title}
              </h3>
              <h3 className="text-2xl font-semibold">
                {data?.metadata.created_at && <>Created:{' '}
                {dateFormater(
                  data?.metadata.created_at &&
                    new Date(parseNanoSecToMs(data?.metadata.created_at)),
                )}</>}
              </h3>
              <form className="bd-how flex flex-col">
                  <h3 className="text-2xl text-center mb-2 font-bold">
                    {data.oracle.oracle_name}
                  </h3>
                  <h3 className="text-xl text-center mb-2">
                    Current Value ({data.oracle.unit}): {data.oracle.oracle_val}
                  </h3>
              </form>
              <h3 className="text-2xl font-semibold">
                Charity Royalty: { Object.values(data.royalty)[0]}
              </h3>
              <h3 className="text-2xl font-semibold">
                Seller Royalty: {100 - Object.values(data.royalty)[0]}
              </h3>
              <h3 className="text-2xl font-semibold mt-8">
              {console.log("test 24242: ", data)}

              {
                data.price != null && String(data.price).includes("e") &&
                <> price: {parseInt(data.price)} NEAR Token</>
              }

              {
                data.price != null && !String(data.price).includes("e") &&
                <> price: {utils.format.formatNearAmount(data.price)} NEAR Token</>
              }
                
              </h3>
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
