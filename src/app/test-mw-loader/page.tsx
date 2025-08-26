'use client'

import { 
  MWLoader, 
  MWDotsLoader, 
  MWProgressiveLoader,
  MWHeartbeatLoader,
  MWMatrixLoader,
  MWBounceLoader
} from '@/components/ui/MWLoader'

export default function TestMWLoader() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">MW Loader Test Page</h1>
      
      <div className="space-y-4">
        <h2>MW Text Loader</h2>
        <div className="flex space-x-4">
          <MWLoader size="sm" animation="pulse" />
          <MWLoader size="md" animation="wave" />
          <MWLoader size="lg" animation="glow" />
        </div>
      </div>
      
      <div className="space-y-4">
        <h2>MW Dots Loader</h2>
        <div className="flex space-x-4">
          <MWDotsLoader size="sm" dotAnimation="bouncing" />
          <MWDotsLoader size="md" dotAnimation="typing" />
          <MWDotsLoader size="lg" dotAnimation="fading" />
        </div>
      </div>
      
      <div className="space-y-4">
        <h2>MW Progressive Loader (Left to Right Fill)</h2>
        <div className="flex space-x-4">
          <MWProgressiveLoader size="sm" variant="default" speed="fast" />
          <MWProgressiveLoader size="md" variant="primary" speed="normal" />
          <MWProgressiveLoader size="lg" variant="gradient" speed="slow" />
        </div>
      </div>

      <div className="space-y-4">
        <h2>MW Heartbeat Loader</h2>
        <div className="flex space-x-4">
          <MWHeartbeatLoader size="sm" variant="primary" speed="fast" />
          <MWHeartbeatLoader size="md" variant="gradient" speed="normal" />
          <MWHeartbeatLoader size="lg" variant="pulse" speed="slow" />
        </div>
      </div>

      <div className="space-y-4">
        <h2>MW Matrix Loader</h2>
        <div className="flex space-x-4">
          <MWMatrixLoader size="sm" speed="fast" />
          <MWMatrixLoader size="md" speed="normal" />
          <MWMatrixLoader size="lg" speed="slow" />
        </div>
      </div>

      <div className="space-y-4">
        <h2>MW Bounce Loader</h2>
        <div className="flex space-x-4">
          <MWBounceLoader size="sm" variant="primary" />
          <MWBounceLoader size="md" variant="gradient" />
          <MWBounceLoader size="lg" variant="rainbow" />
        </div>
      </div>
    </div>
  )
}
