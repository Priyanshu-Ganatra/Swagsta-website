import ProjectsGrid from "./ProjectsGrid"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useSelector } from "react-redux"

export default function PortfolioPage() {
  const { loading, projects } = useSelector(state => state.projects)
  const [sortBy, setSortBy] = useState('Most recent')
  // all filter categories
  const [categories, setCategories] = useState([])
  // filter categories
  const [filteredCategories, setFilteredCategories] = useState([])

  const handleCategoryChange = (category) => {
    if (filteredCategories.includes(category)) {
      setFilteredCategories(filteredCategories.filter(item => item !== category))
    } else {
      setFilteredCategories([...filteredCategories, category])
    }
  }

  useEffect(() => {
    if (!loading) {
      let categories = projects.map(project => project.category)
      categories = new Set(categories)
      setCategories([...categories])
      setFilteredCategories(Array.from(categories))
    }
  }, [projects, loading]);

  return (
    <div className="flex">
      {/* Main content */}
      <div className='flex-1'>
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">

            <DropdownMenu>
              <DropdownMenuTrigger asChild className="gap-3">
                <Button variant="outline">Filters <MdKeyboardArrowDown /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                {
                  loading
                    ?
                    <div className="flex flex-col items-center">
                      <span className="loading loading-ring loading-md"></span>
                      Loading filters...
                    </div>
                    :
                    categories.map((category, index) => (
                      <DropdownMenuCheckboxItem
                        key={index}
                        checked={filteredCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      >
                        {category}
                      </DropdownMenuCheckboxItem>
                    ))
                }
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="gap-3" asChild>
                <Button variant="outline">Sort by: {sortBy} <MdKeyboardArrowDown /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                  <DropdownMenuRadioItem value="Featured">Featured</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Most recent">Most recent</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Most liked">Most liked</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Grid */}
          <ProjectsGrid filteredCategories={filteredCategories} sortBy={sortBy} />
        </div>
      </div>

    </div>
  )
}
