import React from 'react'

const Background = ({ children }) => {
  return (
    <div className='min-h-screen w-full bg-[#fefcff] relative'>
      {/* Dreamy Sky Pink Glow */}
      <div
        className='absolute z-0 inset-0'
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {children}
    </div>
  )
}

export default Background
