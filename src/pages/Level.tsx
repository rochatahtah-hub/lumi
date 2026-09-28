import { useNavigate } from 'react-router-dom'
import { LevelPicker } from '../components/LevelPicker'
import { Page, TopBar } from '../components/ui'
import { setProfile, useLumi } from '../lib/store'

export default function LevelPage() {
  const nav = useNavigate()
  const current = useLumi((s) => s.profile.level)
  return (
    <>
      <TopBar title="Minha série" />
      <Page>
        <LevelPicker
          current={current}
          onPick={(level, age) => {
            setProfile({ level, age })
            nav(-1)
          }}
        />
      </Page>
    </>
  )
}
