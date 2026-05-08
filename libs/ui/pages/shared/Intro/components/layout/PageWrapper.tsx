interface Props {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: Props) {
  return (
    <>
      <div className='cloud-bg' />
      <div className='bg-overlay' />
      <div className='orb orb-1' />
      <div className='orb orb-2' />
      <div className='orb orb-3' />
      {children}
    </>
  );
}
