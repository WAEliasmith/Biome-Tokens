import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Oracles = ({ contract }) => {
  const [oracles, setOracles] = useState([])

  const getOracles = async () => {
    var test = null;
    try {
      test = await contract.get_oracles({})
      setOracles(test)
      console.log("oracle success: ", test)
    } catch (error) {
      console.log("oracle error: ", error)
    }
  }

  useEffect(() => {
    getOracles()
  }, [])

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
                  <h3 className="text-2xl text-left mb-2 font-bold">
                    {oracle.oracle_name}
                  </h3>
                  <h3 className="text-xl text-left mb-2">
                    Id: {oracle.oracle_id}
                  </h3>
                  
                  <h3 className="text-xl text-left mb-2">
                    Current Value ({oracle.oracle_unit}): {oracle.oracle_val}
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
