import { RootNavigation } from "@/app/stacks/root/navigation"
import { Providers } from "@/app/providers"

export default function App() {
  return (
    <Providers>
      <RootNavigation />
    </Providers>
  )
}
