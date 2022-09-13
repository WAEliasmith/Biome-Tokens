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
import TokenIdModal from '../../components/Modal/tokenId'
import { Unity, useUnityContext } from "react-unity-webgl";

const txFee = Big(0.5)
  .times(10 ** 24)
  .toFixed()
const GAS = Big(3)
  .times(10 ** 13)
  .toFixed()

const Home = ({ contract }) => {
  const { sendMessage, unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "Build/Build.loader.js",
    dataUrl: "Build/Build.data",
    frameworkUrl: "Build/Build.framework.js",
    codeUrl: "Build/Build.wasm",
  });
  // We'll round the loading progression to a whole number to represent the
  // percentage of the Unity Application that has loaded.
  const loadingPercentage = Math.round(loadingProgression * 100);

  useEffect(() => {
    if(isLoaded === true){
      sendMessage("Game Controller", "SendToController", "456");
    }
  }, [isLoaded])

  // const [homeBtn, setHomeBtn] = useState('Create A Token')
  // const [created, setCreated] = useState('')
  const [modal, setModal] = useState(false)
  const query = useQuery()
  const hash = query.get('transactionHashes')
  const history = useHistory()

  // const createNewGame = async () => {
  //   try {
  //     await contract.createNewGame({}, GAS, txFee)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <Wrapper>
      <section className="bd-intro flex flex-col items-center justify-between">
        <div className="w-full flex mt-10">
          <h1 className="mx-auto" >
            We help nature <br /> with the power of NFTs
          </h1>
        </div>
        <article className="w-1/2 flex flex-row">
          <div className="container mx-auto">
            {isLoaded === false && (
              // We'll conditionally render the loading overlay if the Unity
              // Application is not loaded.
              <div className="loading-overlay">
                <p>Loading... ({loadingPercentage}%)</p>
              </div>
            )}
            <Unity className="unity" unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
          </div>
          {/* <Button
            style={{ height: 55 }}
            className="my-12"
            onClick={() => {
              setHomeBtn('Loading...')
              createNewGame().then((val) => {
                setHomeBtn('Create A Token')
              })
            }}
          >
            {homeBtn}
          </Button> */}
        </article>
      </section>
      <section className="bd-how py-12 flex items-center justify-between">
        <article className="flex flex-col">
          <h2 className="mx-auto text-4xl font-bold">How It Works</h2>
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
      </section>
      {/* <TokenIdModal
        id={created}
        open={modal}
        handleClose={() => {
          query.delete('transactionHashes')
          history.replace({
            search: query.toString(),
          })
          
          setModal(false)
        }}
      /> */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & > .bd-intro {
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
