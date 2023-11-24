import React, {FC} from 'react';


interface HeadProps{
    titulo: string;
    descricao: string;
    palavrasChaves: string;
    
}


const Heading: FC<HeadProps> = ({ titulo, descricao, palavrasChaves }) => {
  return (
    <>
      <title>{titulo}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="descricao" content={descricao} />
      <meta name="palavrasChaves" content={palavrasChaves} />
    </>
  );
};


export default Heading;