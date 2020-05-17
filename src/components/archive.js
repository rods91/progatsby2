import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"

const POST_ARCHIVE_QUERY = graphql`
  query BlogPostArchive {
    allMarkdownRemark(
      limit: 5
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            title
            date(formatString: "MMMM DD,YYYY")
            slug
          }
        }
      }
    }
  }
`
const ArchiveList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  a {
    font-size: 0.8rem;
    font-family: "Futura PT", -apple-system, "BlinkMacSystemFont", "Segoe UI",
      "Roboto", "Helvetica Neue", "Arial", "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    text-decoration: underline;
    color: #524763;
  }
`

const Archive = () => {
  const data = useStaticQuery(POST_ARCHIVE_QUERY)

  return (
    <>
      <aside>
        <h3>Archive</h3>
        <ArchiveList>
          {data.allMarkdownRemark.edges.map((edge, index) => (
            <li key={edge.node.frontmatter.slug}>
              <Link to={`/posts${edge.node.frontmatter.slug}`}>
                {edge.node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ArchiveList>
      </aside>
    </>
  )
}

export default Archive
