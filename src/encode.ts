import { FrameHeader, HEADER_LENGTH } from './frame.js'

const allocHeaderFn = (): () => Uint8Array => {
  if (globalThis.Buffer) {
    return () => globalThis.Buffer.allocUnsafe(HEADER_LENGTH)
  }
  return () => new Uint8Array(HEADER_LENGTH);
}
const allocHeader = allocHeaderFn();

export function encodeHeader (header: FrameHeader): Uint8Array {
  const frame = allocHeader()

  // always assume version 0
  // frameView.setUint8(0, header.version)

  frame[1] = header.type

  frame[2] = header.flag >>> 8
  frame[3] = header.flag

  frame[4] = header.streamID >>> 24
  frame[5] = header.streamID >>> 16
  frame[6] = header.streamID >>> 8
  frame[7] = header.streamID

  frame[8] = header.length >>> 24
  frame[9] = header.length >>> 16
  frame[10] = header.length >>> 8
  frame[11] = header.length

  return frame
}
