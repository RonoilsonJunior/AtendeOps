"use client"

import { useEffect, useState } from "react"

interface DecryptedTextProps {
  text: string
  className?: string
  delay?: number
  speed?: number
}

export function DecryptedText({ text, className = "", delay = 0, speed = 25 }: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isDecrypting, setIsDecrypting] = useState(true)

  const characters = "0123456789"

  useEffect(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index]
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join(""),
      )

      if (iteration >= text.length) {
        clearInterval(interval)
        setIsDecrypting(false)
      }

      iteration += 1 / 5
    }, speed)

    const timeout = setTimeout(
      () => {
        clearInterval(interval)
        setDisplayText(text)
        setIsDecrypting(false)
      },
      delay + text.length * 50,
    )

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [text, delay, speed])

  return <span className={`font-mono transition-all duration-500 ease-out ${className}`}>{displayText}</span>
}
