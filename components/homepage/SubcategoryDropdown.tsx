'use client'

import { useRouter } from 'next/navigation'
import styles from './SubcategoryDropdown.module.css'

interface SubcategoryDropdownProps {
  subcategories: string[]
}

export default function SubcategoryDropdown({ subcategories }: SubcategoryDropdownProps) {
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === '') {
      router.push('/articles')
    } else {
      router.push(`/articles/subcategory/${value.toLowerCase().replace(/\s+/g, '-')}`)
    }
  }

  return (
    <div className={styles.dropdown}>
      <select className={styles.select} onChange={handleChange} defaultValue="">
        <option value="">All Subcategories</option>
        {subcategories.map((subcategory) => (
          <option key={subcategory} value={subcategory}>
            {subcategory}
          </option>
        ))}
      </select>
    </div>
  )
}