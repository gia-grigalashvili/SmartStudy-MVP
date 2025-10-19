import React from 'react';
import { Users, Search, Calendar, BookOpen, Award, Clock, Loader2, ChevronRight } from 'lucide-react';
import {  useGetGroups } from '@/libs/queries/student/groups';
import { getPaginationFields } from "@/utils";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Groups() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { filledSearchParams } = getPaginationFields(searchParams);
  const { data,  isLoading } = useGetGroups(filledSearchParams);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">იტვირთება...</p>
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">ჯგუფები არ მოიძებნა</p>
        </div>
      </div>
    );
  }

  const groups = data.data;

  const handleSearch = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-600" />
            ჩემი ჯგუფები
          </h1>
          <p className="text-gray-600 mt-2">აქ ნახავ ყველა ჯგუფს, სადაც ხარ</p>
        </div>

      
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ჯგუფის ძებნა..."
              defaultValue={searchParams.get('search') || ''}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-purple-500 outline-none"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <Users className="w-10 h-10 mb-3 opacity-80" />
            <p className="text-blue-100 text-sm mb-1">სულ ჯგუფები</p>
            <p className="text-4xl font-bold">{groups.length}</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <BookOpen className="w-10 h-10 mb-3 opacity-80" />
            <p className="text-purple-100 text-sm mb-1">აქტიური საგნები</p>
            <p className="text-4xl font-bold">{groups.length}</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
            <Award className="w-10 h-10 mb-3 opacity-80" />
            <p className="text-green-100 text-sm mb-1">წარმატებები</p>
            <p className="text-4xl font-bold">12</p>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, index) => (
            <div 
              key={group.id || index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => navigate(`/groups/${group.id}`)}
            >
             
              <div className="h-32 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-white text-sm font-medium">აქტიური</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Users className="w-8 h-8 text-white/80" />
                </div>
              </div>

          
              <div className="p-6">
              {group.subjects.map((subj) => (
  <h3 key={subj.id} className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
    {subj.subject.translations[0].name}
  </h3>
))}
                
                <p className="text-gray-600 text-sm mb-4">
                  ID: {group.id ? group.id.slice(0, 8) + '...' : 'N/A'}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">შეიქმნა: {group.createdAt ? new Date(group.createdAt).toLocaleDateString('ka-GE') : 'N/A'}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">ბოლო განახლება: {group.updatedAt ? new Date(group.updatedAt).toLocaleDateString('ka-GE') : 'N/A'}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <span>ნახვა</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

       
        {groups.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">ჯგუფები არ მოიძებნა</h3>
            <p className="text-gray-600">ჯერ არ ხარ არცერთ ჯგუფში</p>
          </div>
        )}
      </div>
    </div>
  );
}