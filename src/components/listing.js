import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Image from "../components/image"

const LISTING_QUERY = graphql`
  query BlogPostListing {
    allMarkdownRemark(
      limit: 10
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
          }
          excerpt
        }
      }
    }
  }
`

const Post = styled.article`
  box-shadow: 0 3px 10px rgba(25, 17, 34, 0.05);
  padding: 1rem;
  border-radius: 4px;
  margin-botom: 1rem;

  a {
    color: #000;
    text-decoration: none;
  }
  p {
    font-size: 0.8rem;
  }
  h2 {
    margin-bottom: 0;
  }
  .read-more {
    font-size: 0.8rem;
    font-family: "Futura PT", -apple-system, "BlinkMacSystemFont", "Segoe UI",
      "Roboto", "Helvetica Neue", "Arial", "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    text-decoration: underline;
    color: #524763;
  }
`

const Listing = () => {
  const data = useStaticQuery(LISTING_QUERY)
  const { allMarkdownRemark } = data

  return (
    <>
      {allMarkdownRemark.edges.map(edge => (
        <Post key={edge.node.frontmatter.slug}>
          <Link to={`/posts${edge.node.frontmatter.slug}`}>
            <h2>{edge.node.frontmatter.title}</h2>
          </Link>
          <p>{edge.node.frontmatter.date}</p>
          <p>{edge.node.excerpt}</p>
          <Link
            className="read-more"
            to={`/posts${edge.node.frontmatter.slug}`}
          >
            Read More
          </Link>
        </Post>
      ))}
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
    </>
  )
}

export default Listing
