import React from 'react'
import { InternCard, Title } from '../../components'
import { useStateContext } from '../../context/ContextProvider';

const Saved = () => {
  const { recommendations } = useStateContext();

  return (
    <div className='flex flex-col justify-center items-center lg:my-15 my-20  '>
      <Title title='saved intern' />
      {recommendations.map((recommendation) => (
        <InternCard
          key={recommendation.id}
          recommendation={recommendation}
          icon='material-symbols:bookmark-outline-rounded'
        />
      ))}
    </div>
  )
}

export default Saved