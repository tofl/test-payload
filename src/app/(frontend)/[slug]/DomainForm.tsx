'use client'

import React, { useState } from 'react'

type Page = {
  id: number
  name: string | null
}

type Props = {
  domainName: string
  domainType: string
  pages: Page[]
}

export default function DomainForm({ domainName, domainType, pages }: Props) {
  const [selectedPage, setSelectedPage] = useState('')
  const [language, setLanguage] = useState('')
  const [profile, setProfile] = useState('')

  const selectLabel = domainType === 'product' ? 'Select your country' : 'Select a product'
  const pageSelected = selectedPage !== ''
  const canSubmit = pageSelected && language !== '' && profile !== ''

  return (
    <div className="flex w-1/2 flex-col px-16 py-12">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900">{domainName}</h1>

      {/* Centered sub-block */}
      <div className="my-auto">
        <p className="mb-8 text-lg font-medium text-gray-700">
          Please enter your information before entering the site
        </p>

        <form className="flex flex-col gap-6">
          {/* Select */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="page-select">
              {selectLabel}
            </label>
            <select
              id="page-select"
              value={selectedPage}
              onChange={(e) => {
                setSelectedPage(e.target.value)
                setLanguage('')
                setProfile('')
              }}
              className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3c217b]"
            >
              <option value="">—</option>
              {pages.map((page) => (
                <option key={page.id} value={String(page.id)}>
                  {page.name}
                </option>
              ))}
            </select>
          </div>

          {/* Radio groups — visible only after a page is selected */}
          {pageSelected && (
            <>
              {/* Language */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Select your language</span>
                {['English', 'French'].map((lang) => (
                  <label key={lang} className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="language"
                      value={lang}
                      checked={language === lang}
                      onChange={() => setLanguage(lang)}
                    />
                    {lang}
                  </label>
                ))}
              </div>

              {/* Profile */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Select your profile</span>
                {['Healthcare Professional', 'Patient'].map((p) => (
                  <label key={p} className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="profile"
                      value={p}
                      checked={profile === p}
                      onChange={() => setProfile(p)}
                    />
                    {p}
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-2 w-fit rounded bg-[#3c217b] px-8 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}
