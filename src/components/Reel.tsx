const Reel = () => {
  return (
    <div>
      <svg
        className="w-32 h-32 animate-spin origin-center"
        viewBox="0 0 150 150"
      >
        <g fill="#000">
          {/**  Outer ring */}
          <circle cx="75" cy="75" r="70" />

          {/** Inner cutout */}
          <circle cx="75" cy="75" r="60" fill="#fff" />

          {/** Center hub */}
          <circle cx="75" cy="75" r="10" />

          {/** Spokes */}
          <g transform="translate(75,75)">
            <ellipse cx="0" cy="-35" rx="10" ry="18" />
            <g transform="rotate(72)">
              <ellipse cx="0" cy="-35" rx="10" ry="18" />
            </g>
            <g transform="rotate(144)">
              <ellipse cx="0" cy="-35" rx="10" ry="18" />
            </g>
            <g transform="rotate(216)">
              <ellipse cx="0" cy="-35" rx="10" ry="18" />
            </g>
            <g transform="rotate(288)">
              <ellipse cx="0" cy="-35" rx="10" ry="18" />
            </g>
          </g>

          {/** Small holes (offset between spokes) */}
          <g transform="translate(75,75) rotate(36)">
            <circle cx="0" cy="-22" r="3" />
            <g transform="rotate(72)">
              <circle cx="0" cy="-22" r="3" />
            </g>
            <g transform="rotate(144)">
              <circle cx="0" cy="-22" r="3" />
            </g>
            <g transform="rotate(216)">
              <circle cx="0" cy="-22" r="3" />
            </g>
            <g transform="rotate(288)">
              <circle cx="0" cy="-22" r="3" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Reel
