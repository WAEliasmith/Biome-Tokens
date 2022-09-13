import { useState } from 'react'
import styled from 'styled-components'

const defaultOracles = [
  {
    id: "myIdPlaceholder",
    value: 1,
  },
  {
    id: "myIdPlaceholder2",
    value: 2,
  }
]

const Oracles = ({ contract }) => {
  const [oracles, setOracles] = useState(defaultOracles)

  const GetOracles = async () => {
    try {
      //await contract.Mint(mintData, GAS, txFee)
      setOracles([])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Wrapper>
      <section className="bd-intro py-12 flex items-center justify-between">
        <article className="ml-32 w-1/2">
          <h2 className="text-3xl font-bold mb-16">
            Oracles
          </h2>
          {
            oracles.map((oracle) => {
              return(
                <form className="bd-how w-full flex flex-col">
                  <h3 className="text-xl text-left mb-2">
                    Oracle {oracle.id}
                  </h3>
                  <h3 className="text-xl text-left mb-2">
                    Value {oracle.value}
                  </h3>
              </form>
            )
            })
          }
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

export default Oracles
