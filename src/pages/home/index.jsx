import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import Icon from '../../components/Icon/Icon'
import Input from '../../components/Input/Input'
import Big from 'big.js'
import { useHistory } from 'react-router-dom'
import { decodeArgs, txReturnArgsFromHash } from '../../utils/near'
import useQuery from '../../hooks/useQuery'
import GameIdModal from '../../components/Modal/gameId'

const txFee = Big(0.5)
  .times(10 ** 24)
  .toFixed()
const GAS = Big(3)
  .times(10 ** 13)
  .toFixed()

const Home = ({ contract }) => {
  const [gameId, setGameId] = useState('')
  const [homeBtn, setHomeBtn] = useState('Create A Game')
  const [created, setCreated] = useState('')
  const [modal, setModal] = useState(false)
  const query = useQuery()
  const hash = query.get('transactionHashes')
  const history = useHistory()

  const createNewGame = async () => {
    try {
      await contract.createNewGame({}, GAS, txFee)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    history.push('/game/' + gameId)
  }

  const handleShowGameId = (arg) => {
    setCreated(arg)
    setModal(true)
  }

  return (
    <Wrapper>
      <section className="bd-intro mx-auto flex items-center justify-between">
        <article className="w-1/2">
          <h1>
            We help nature <br /> with the power of <br /> NFTs
          </h1>
          <Button
            style={{ height: 55 }}
            className="my-8"
            onClick={() => {
              setHomeBtn('Loading...')
              createNewGame().then((val) => {
                setHomeBtn('Create A Game')
              })
            }}
          >
            {homeBtn}
          </Button>
          <Link to="/">How it works ?</Link>
        </article>
        <article className="w-1/2">
          <Icon size={650} className="-ml-10" icon="header" />
        </article>
      </section>
      <section className="bd-how py-12 flex items-center justify-between">
        <article className="w-1/2">
          <h2 className="text-3xl font-bold">How Does It Work?</h2>
          <div className="flex mt-8">
            <span>
              <Icon
                className="bg-white rounded-full h-16 w-16 flex items-center mr-6 justify-center"
                icon="create"
              />
            </span>
            <div>
              <h3 className="font-bold text-xl mb-2">NEAR NFT technology</h3>
              <p>
                We store each ecosystem as a seperate NFT, and keep track of the owners using the NEAR blockchain.
                We also track the polution levels of each ecosystem and inscrease charity 
                royalties for selling the ecosystem if the environment is bad
              </p>
            </div>
          </div>
          <div className="flex mt-8">
            <span>
              <Icon
                className="bg-white rounded-full h-16 w-16 flex items-center mr-6 justify-center"
                icon="join"
              />
            </span>
            <div>
              <h3 className="font-bold text-xl mb-2">View Ecosystem</h3>
              <p>
                You can find an ecosystem using the token explorer, or by typing in the ID
              </p>
            </div>
          </div>
          <div className="flex mt-8">
            <span>
              <Icon
                className="bg-white rounded-full h-16 w-16 flex items-center mr-6 justify-center"
                icon="dice"
              />
            </span>
            <div>
              <h3 className="font-bold text-xl mb-2">Buy an ecosystem</h3>
              <p>
                You can search through all of the ecosystems, 
                and buy one or more of them. This donates to protect the ecosystems!
              </p>
            </div>
          </div>
          <div className="flex mt-8">
            <span>
              <Icon
                className="bg-white rounded-full h-16 w-16 flex items-center mr-6 justify-center"
                icon="winning"
              />
            </span>
            <div>
              <h3 className="font-bold text-xl mb-2">The Environment</h3>
              <p>
                We donate a portion of each sale to charity 
                based on how bad the environment is in that area.
              </p>
            </div>
          </div>
        </article>
        <article className="ml-32 w-1/2">
          <h2 className="text-3xl text-center font-bold mb-16">
            Enter A Token ID to view
          </h2>
          <form className="w-full flex flex-col items-center">
            <Input
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              placeholder="Enter Game ID"
            />
            <Button
              style={{ height: 55 }}
              className="mt-12 w-max"
              onClick={handleSubmit}
            >
              Search Game
            </Button>
          </form>
        </article>
      </section>
      <GameIdModal
        id={created}
        open={modal}
        handleClose={() => {
          query.delete('transactionHashes')
          history.replace({
            search: query.toString(),
          })
          
          setModal(false)
        }}
      />
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

export default Home
