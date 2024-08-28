import CreativesGrid from "@/components/CreativesGrid"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from 'react'
import { MdFilterList, MdKeyboardArrowDown } from 'react-icons/md'
import { useSelector } from "react-redux"
import { Checkbox } from "@/components/ui/checkbox"

export default function PortfolioPage() {
  const { loading, creatives } = useSelector(state => state.creatives)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
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
      const categories = creatives.map(creative => creative.category)
      setCategories([...new Set(categories)])
    }
  }, [creatives, loading]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white transition-all duration-300 ease-in-out z-10 overflow-hidden group
          ${sidebarCollapsed ? 'w-12 hover:w-64' : 'w-40'}`}
        onMouseEnter={() => setSidebarCollapsed(false)}
        onMouseLeave={() => setSidebarCollapsed(true)}
      >
        <div className={`p-4 transition-all duration-300
          ${sidebarCollapsed ? 'opacity-0 invisible group-hover:opacity-100 group-hover:visible' : 'opacity-100 visible'}`}>
          <h2 className="text-xl font-bold mb-4 whitespace-nowrap">Filters</h2>
          <div className="space-y-2">
            {
              loading
                ?
                <div className="flex flex-col items-center mt-10">
                  <span className="loading loading-ring loading-md"></span>
                  Loading categories...
                </div>
                :
                categories.map((category, index) => (
                  <div key={index} className="flex items-center space-x-2 whitespace-nowrap" onClick={() => handleCategoryChange(category)}>
                    <Checkbox id={category} />
                    <label className="hover:cursor-pointer" htmlFor={category} onClick={(e) => e.stopPropagation()}>{category}</label>
                  </div>
                ))
            }
          </div>
        </div>
        <div className={`absolute top-1/2 left-0 w-12 flex justify-center items-center transform -translate-y-1/2 transition-all duration-300
          ${sidebarCollapsed ? 'opacity-100 visible group-hover:opacity-0 group-hover:invisible' : 'opacity-0 invisible'}`}>
          <MdFilterList size={24} className="hover:cursor-pointer" />
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-12' : 'ml-40'}`}>
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Explore Creatives</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
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
          <CreativesGrid sidebarCollapsed={sidebarCollapsed} filteredCategories={filteredCategories} sortBy={sortBy}/>
        </div>
      </div>
    </div>
  )
}
