import Layout from "@/components/layout"
import { useSession } from "next-auth/react"

export default function IndexPage() {
  const { data } = useSession()

  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}
